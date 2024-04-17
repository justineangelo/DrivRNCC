import ride from "store/actions/ride";

export type NavigationUnsubscriber = () => void;

export type NavigationListenerName = "focus" | "blur" | "state";

export interface NavigationProps {
  navigation?: {
    popToTop: () => void;
    goBack: () => void;
    openDrawer: () => void;
    closeDrawer: () => void;
    toggleDrawer: () => void;
    navigate: (screen: string, params?: any) => void;
    addListener: (name: NavigationListenerName, callback?: (event: any) => void) => NavigationUnsubscriber;
  };
  route?: { key: string; name: string; params: any };
}

export type UnitType = "metric" | "imperial";

export type RideStatus = "pending" | "accepted" | "declined" | "started" | "picked-up" | "dropped-off";

export interface Location {
  name?: string; //address name
  latitude: number;
  longitude: number;
}

export interface Ride {
  id?: string;
  userId?: string;
  driverId?: string;
  pickupLocation?: Location;
  destination?: Location;
  status?: RideStatus;
  pickupTime?: Date;
  timestamp?: Date;
  pickupToDestinationDistance?: number; //meters
  pickupToDestinationDistanceReadable?: string;
  pickupToDestinationDuration?: number; //seconds
  pickupToDestinationDurationReadable?: string;
  driverToPickupDistance?: number; //meters
  driverToPickupDistanceReadable?: string;
  driverToPickupDuration?: number; //seconds
  driverToPickupDurationReadable?: string;
}

interface DMElement {
  distance?: { text?: string; value?: number };
  duration?: { text?: string; value?: number };
  status?: string;
}

export interface DistanceMatrix {
  destination_addresses?: string[];
  origin_addresses?: string[];
  rows?: { elements?: DMElement[] }[];
  status?: string;
}

export interface Profile {
  name?: string;
  rating?: number;
}

export interface ResponseError {
  status?: number;
  data?: string;
}
