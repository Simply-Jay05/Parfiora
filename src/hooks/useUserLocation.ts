import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";

type UserLocationState = {
  latitude: number | null;
  longitude: number | null;
  isLoading: boolean;
  permissionDenied: boolean;
  errorMessage: string | null;
};

export const useUserLocation = () => {
  const [state, setState] = useState<UserLocationState>({
    latitude: null,
    longitude: null,
    isLoading: true,
    permissionDenied: false,
    errorMessage: null,
  });

  const requestLocation = useCallback(async () => {
    setState((current) => ({
      ...current,
      isLoading: true,
      errorMessage: null,
    }));

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setState({
          latitude: null,
          longitude: null,
          isLoading: false,
          permissionDenied: true,
          errorMessage: null,
        });
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        isLoading: false,
        permissionDenied: false,
        errorMessage: null,
      });
    } catch (error) {
      console.error("Error getting location:", error);
      setState({
        latitude: null,
        longitude: null,
        isLoading: false,
        permissionDenied: false,
        errorMessage:
          "Couldn't get your location. Check your connection and try again.",
      });
    }
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  return { ...state, requestLocation };
};
