import { auth, db } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type UserProfile = {
  uid: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  profileImage: string | null;
};

type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    profileImage: string | null;
  }) => Promise<void>;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          await getUserProfile(firebaseUser.uid);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
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

      setProfile({
        uid: user.uid,
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        email: user.email ?? email,
        phoneNumber: null,
        profileImage: null,
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

  const getUserProfile = async (uid: string) => {
    const userRef = doc(db, "user", uid);

    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      setProfile(userSnapshot.data() as UserProfile);
    } else {
      setProfile(null);
    }
  };

  const updateProfile = async ({
    firstName,
    lastName,
    phoneNumber,
    profileImage,
  }: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    profileImage: string | null;
  }) => {
    if (!user) {
      throw new Error("No authenticated user");
    }

    const fullName = `${firstName} ${lastName}`;
    const userRef = doc(db, "user", user.uid);
    await updateDoc(userRef, {
      firstName,
      lastName,
      fullName,
      phoneNumber: phoneNumber || null,
      profileImage,
      updatedAt: serverTimestamp(),
    });
    setProfile((currentProfile) => {
      if (!currentProfile) return currentProfile;
      return {
        ...currentProfile,
        firstName,
        lastName,
        fullName,
        phoneNumber: phoneNumber || null,
        profileImage,
      };
    });
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, isLoading, login, signup, logout, updateProfile }}
    >
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
