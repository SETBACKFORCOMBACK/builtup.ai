import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Changed to const with arrow function for Fast Refresh compatibility
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // DEVELOPMENT MODE: Auto-login with a mock user
    // Remove this for production and uncomment the original code below
    const mockUser = {
      id: "dev-user-id",
      email: "dev@example.com",
      user_metadata: { name: "Dev User" },
    } as User;

    const mockSession = {
      access_token: "mock-token",
      refresh_token: "mock-refresh-token",
      expires_in: 3600,
      user: mockUser,
    } as Session;

    setSession(mockSession);
    setUser(mockUser);
    setIsLoading(false);

    // PRODUCTION CODE (currently disabled):
    // Get initial session
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   setSession(session);
    //   setUser(session?.user ?? null);
    //   setIsLoading(false);
    // });

    // // Listen for auth changes
    // const {
    //   data: { subscription },
    // } = supabase.auth.onAuthStateChange((_event, session) => {
    //   setSession(session);
    //   setUser(session?.user ?? null);
    //   setIsLoading(false);
    // });

    // return () => subscription.unsubscribe();
    return () => {}; // No cleanup needed for mock user
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    isLoading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Changed to const with arrow function for Fast Refresh compatibility
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Named exports for Fast Refresh compatibility
export { AuthProvider, useAuth };
