import { DistanceMatrix, Location, Profile, Ride, UnitType } from "interfaces";

//retrive dummy rides location
export const fetchRidesNearMe = async function (location: Location): Promise<Ride[]> {
  return await fetch(process.env.EXPO_PUBLIC_RIDE_BASE_API_URL + "/rides").then((response) => response.json());
};

export const fetchProfile = async function (): Promise<Profile> {
  return await fetch(process.env.EXPO_PUBLIC_RIDE_BASE_API_URL + "/profile").then((response) => response.json());
};

export const fetchMapsDistanceMatrix = async function (origins: Location[], destinations: Location[], units: UnitType = "metric"): Promise<DistanceMatrix> {
  const searchParams = new URLSearchParams({
    origins: origins.map((o) => `${o.latitude},${o.longitude}`).join("|"),
    destinations: destinations.map((d) => `${d.latitude},${d.longitude}`).join("|"),
    units: units,
    key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string,
  });
  return await fetch(process.env.EXPO_PUBLIC_GOOGLE_MAPS_BASE_API_URL + `?` + searchParams).then((response) => response.json());
};

export default {
  fetchRidesNearMe,
  fetchProfile,
  fetchMapsDistanceMatrix,
};
