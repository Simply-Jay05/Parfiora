import NetInfo from "@react-native-community/netinfo";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

type NetworkContextType = {
  isConnected: boolean | null;
  checkConnection: () => Promise<boolean>;
};

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

type NetworkProviderProps = {
  children: ReactNode;
};

export function NetworkProvider({ children }: NetworkProviderProps) {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const connected =
        state.isConnected === true && state.isInternetReachable !== false;

      setIsConnected(connected);
    });

    return () => unsubscribe();
  }, []);

  const checkConnection = async () => {
    const state = await NetInfo.fetch();

    const connected =
      state.isConnected === true && state.isInternetReachable !== false;

    setIsConnected(connected);

    return connected;
  };

  return (
    <NetworkContext.Provider value={{ isConnected, checkConnection }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  const context = useContext(NetworkContext);

  if (!context) {
    throw new Error("useNetwork must be used inside NetworkProvider");
  }

  return context;
}
