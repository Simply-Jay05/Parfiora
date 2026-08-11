import { auth } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (emaii: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, emaii, password);
      if (!result) {
        alert("User is undefined");
      }
      setUser(result.user);
      setIsLoading(false);
    } catch (error) {
      console.error("Error on logging in: ", error);
      setIsLoading(false);
    }
  };

  const signup = async (emaii: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        emaii,
        password,
      );
      if (!result) {
        alert("User is undefined");
      }
      setUser(result.user);
      setIsLoading(false);
    } catch (error) {
      console.error("Error on signing up: ", error);
      setIsLoading(false);
    }
  };

  const signout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProivder");
  }
  return context;
};
