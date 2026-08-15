import { auth, db } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
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
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => Promise<void>;
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

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
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

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    setIsLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (!result) {
        alert("User is undefined");
      }

      const user = result.user;

      const userRef = doc(db, "user", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        email: user.email,
        phoneNumber: null,
        profileImage: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setUser(user);
      console.log(user);
    } catch (error) {
      console.error("Error on signing up: ", error);
      setIsLoading(false);
    } finally {
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
