export type Branch = {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  latitude: number;
  longitude: number;
  image: string;
};

export type BranchWithDistance = Branch & {
  distanceKm: number | null;
};
