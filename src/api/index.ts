import { DistanceMatrix, Location, Profile, Ride, UnitType } from "interfaces";
import Constants from "./constants";

//retrive dummy rides location
export const fetchRidesNearMe = async function (location: Location): Promise<Ride[]> {
  return await fetch(Constants.rideBaseApiUrl + "/rides").then((response) => response.json());
};

export const fetchProfile = async function (): Promise<Profile> {
  return await fetch(Constants.rideBaseApiUrl + "/profile").then((response) => response.json());
};

export const fetchMapsDistanceMatrix = async function (origins: Location[], destinations: Location[], units: UnitType = "metric"): Promise<DistanceMatrix> {
  const searchParams = new URLSearchParams({
    origins: origins.map((o) => `${o.latitude},${o.longitude}`).join("|"),
    destinations: destinations.map((d) => `${d.latitude},${d.longitude}`).join("|"),
    units: units,
    key: Constants.googleApiKey,
  });
  return await fetch(Constants.googleMapBaseApiUrl + `?` + searchParams).then((response) => response.json());
};

export default {
  fetchRidesNearMe,
  fetchProfile,
  fetchMapsDistanceMatrix,
};
