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

export type RideStatus = "pending" | "accepted" | "declined" | "started" | "picked-up" | "dropped-off";

export type Location = {
  latitude: number;
  longitude: number;
};

export interface Ride {
  id?: string;
  userId?: string;
  driverId?: string;
  pickupLocation?: Location;
  destination?: Location;
  status?: RideStatus;
  pickupTime?: Date;
  timestamp?: Date;
}
