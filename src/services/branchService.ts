import { db } from "@/config/firebase";
import { Branch, BranchWithDistance } from "@/types/branch";
import { collection, getDocs } from "firebase/firestore";

export const getBranches = async (): Promise<Branch[]> => {
  try {
    const branchesRef = collection(db, "branches");
    const snapshot = await getDocs(branchesRef);

    return snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    })) as Branch[];
  } catch (error) {
    console.error("Error fetching branches:", error);
    throw error;
  }
};

// Haversine formula — great-circle distance between two lat/lng points, in km.
export const getDistanceKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const formatDistance = (distanceKm: number | null): string => {
  if (distanceKm === null) return "";
  if (distanceKm < 1) return `${Math.round(distanceKm * 1000)} m`;
  return `${distanceKm.toFixed(1)} km`;
};

// Attaches distance to each branch (if we have the user's location) and sorts
// nearest-first. If location is unavailable, branches keep their original order.
export const attachDistanceAndSort = (
  branches: Branch[],
  userLat: number | null,
  userLon: number | null,
): BranchWithDistance[] => {
  const withDistance: BranchWithDistance[] = branches.map((branch) => ({
    ...branch,
    distanceKm:
      userLat !== null && userLon !== null
        ? getDistanceKm(userLat, userLon, branch.latitude, branch.longitude)
        : null,
  }));

  if (userLat === null || userLon === null) {
    return withDistance;
  }

  return withDistance.sort(
    (a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity),
  );
};
