import { Location, MapRegion } from "interfaces";

const CostPerKmUsd = 1.91;
const PesoPerUsd = 56;
const MinLatDelta = 0.0922;
const MaxLongDelta = 0.0421;

export const calculateFareFromDistance = (distKM: number) => {
  return CostPerKmUsd * distKM * PesoPerUsd;
};

export const calculateRegionByCoordinates = (...locations: Location[]): MapRegion | undefined => {
  if (!locations.length) {
    return undefined;
  }
  let [minLatitude, maxLatitude, minLongitude, maxLongitude] = [locations[0].latitude, locations[0].latitude, locations[0].longitude, locations[0].longitude];

  locations.forEach((location) => {
    minLatitude = Math.min(location.latitude, minLatitude);
    maxLatitude = Math.max(location.latitude, maxLatitude);
    minLongitude = Math.min(location.longitude, minLongitude);
    maxLongitude = Math.max(location.longitude, maxLongitude);
  });
  const midLatitude = (minLatitude + maxLatitude) / 2;
  const midLongitude = (minLongitude + maxLongitude) / 2;
  const latitudeDelta = Math.max(maxLatitude - minLatitude, MinLatDelta);
  const longitudeDelta = Math.max(maxLongitude - minLongitude, MaxLongDelta);

  return { latitude: midLatitude, longitude: midLongitude, latitudeDelta, longitudeDelta };
};
