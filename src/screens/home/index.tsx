import React, { Component, ReactNode } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { RootState } from "store";
import homeSelectors from "store/selectors/home";
import homeActions from "store/actions/home";
import driverSelectors from "store/selectors/driver";
import { Location, MapRegion, NavigationProps, Ride } from "interfaces";
import MapView, { MapMarker, MarkerPressEvent } from "react-native-maps";
import BaseView from "components/BaseView";
import ViewComponent from "components/ViewComponent";
import RatingView from "./components/RatingView";
import BottomBar, { MenuAction } from "./components/BottomBar";
import Toast from "react-native-root-toast";
import SVG from "components/SVG";
import svg from "assets/svg";
import MapViewDirections from "react-native-maps-directions";
import driverActions from "store/actions/driver";
import { calculateRegionByCoordinates } from "utils";

interface HomeScreenProps extends NavigationProps {
  isOnline?: boolean;
  mapRegion?: MapRegion;
  isRideLoading?: boolean;
  availableRides?: Ride[];
  selectedRide?: Ride;
  driverRating?: number;
  driverId?: string;
  currentLocation?: Location;
  rideError?: string;
  driverError?: string;
  setIsOnline: typeof homeActions.setIsOnline;
  setMapRegion: typeof homeActions.setMapRegion;
  fetchRidesNearMe: any /*typeof homeActions.fetchRidesNearMe*/;
  setRideStatus: typeof homeActions.setRideStatus;
  setCurrentLocation: typeof driverActions.setCurrentLocation;
  setSelectedRideId: typeof driverActions.setSelectedRideId;
  fetchProfile: any /*typeof driverActions.fetchProfile*/;
}

class HomeScreen extends Component<HomeScreenProps> {
  constructor(props: HomeScreenProps) {
    super(props);

    this.state = { isLoading: false };
  }
  private toast?: any;

  componentDidMount(): void {
    const location: Location = {
      latitude: 14.614406139110221,
      longitude: 120.98382688850407,
    };
    this.props.setCurrentLocation(location); //set dummy location
    const mapRegion = calculateRegionByCoordinates(location);
    if (mapRegion) {
      this.props.setMapRegion(mapRegion);
    }
    this.props.fetchProfile();
  }

  componentDidUpdate(prevProps: Readonly<HomeScreenProps>): void {
    const { rideError, driverError } = this.props;

    if (prevProps.rideError != rideError && rideError) {
      Toast.show(rideError, { duration: Toast.durations.LONG });
    }
    if (prevProps.driverError != driverError && driverError) {
      Toast.show(driverError, { duration: Toast.durations.LONG });
    }
  }

  render(): ReactNode {
    const {
      isOnline,
      mapRegion,
      isRideLoading,
      availableRides,
      selectedRide,
      driverRating,
      currentLocation,
    } = this.props;

    return (
      <BaseView style={styles.container} useSafeArea={true}>
        <ViewComponent style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            {...(mapRegion ? { region: mapRegion } : null)}
            minZoomLevel={5}
          >
            {selectedRide ? (
              <>
                <MapViewDirections
                  origin={currentLocation}
                  destination={selectedRide.pickupLocation}
                  apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string}
                  strokeWidth={3}
                  strokeColor="red"
                />
                <MapMarker
                  identifier={selectedRide.id}
                  key={selectedRide.id}
                  coordinate={{
                    latitude: selectedRide.pickupLocation!.latitude,
                    longitude: selectedRide.pickupLocation!.longitude,
                  }}
                  onPress={this.marketOnPress}
                >
                  <SVG
                    svg={svg.passengerIC}
                    fill={"black"}
                    height={30}
                    width={30}
                  />
                </MapMarker>
              </>
            ) : (
              availableRides?.map((ride, index) => (
                <MapMarker
                  identifier={ride.id}
                  key={index}
                  coordinate={{
                    latitude: ride.pickupLocation!.latitude,
                    longitude: ride.pickupLocation!.longitude,
                  }}
                  onPress={this.marketOnPress}
                >
                  <SVG
                    svg={svg.passengerIC}
                    fill={"black"}
                    height={30}
                    width={30}
                  />
                </MapMarker>
              ))
            )}
            {currentLocation ? (
              <MapMarker coordinate={currentLocation}>
                <SVG svg={svg.carIC} fill={"black"} height={30} width={30} />
              </MapMarker>
            ) : null}
          </MapView>
          <RatingView
            style={{ position: "absolute", right: 16, top: 16 }}
            rating={driverRating}
          />
          <BottomBar
            isLoading={isRideLoading}
            isOnline={isOnline}
            selectedRide={selectedRide}
            onlineOnPress={this.onlineOnPress}
            menuActionOnPress={this.menuActionOnPress}
          />
        </ViewComponent>
      </BaseView>
    );
  }

  private marketOnPress = (event: MarkerPressEvent) => {
    const { availableRides, currentLocation } = this.props;
    const ride = availableRides?.find(
      (ride) => ride.id === event.nativeEvent.id,
    );

    if (ride?.pickupLocation && currentLocation) {
      const region = calculateRegionByCoordinates(
        currentLocation,
        ride.pickupLocation,
      );
      if (region) {
        this.props.setMapRegion(region);
      }
    }
    this.props.setSelectedRideId(ride?.id);
    this.props.navigation?.navigate("BookingScreen", { data: ride });
  };

  private onlineOnPress = () => {
    const { isOnline, currentLocation } = this.props;

    if (!isOnline && currentLocation) {
      this.props.fetchRidesNearMe(currentLocation);
    }
    this.props.setIsOnline(!isOnline);
  };

  private menuActionOnPress = (action: MenuAction) => {
    const { selectedRide, driverId } = this.props;

    switch (action) {
      case "cancel ride":
        if (selectedRide?.id) {
          this.props.setRideStatus({
            id: selectedRide.id,
            status: "cancelled",
            driverId,
          });
        }
        this.props.setSelectedRideId(undefined);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    isOnline: homeSelectors.selectIsOnline(state),
    mapRegion: homeSelectors.selectMapRegion(state),
    isRideLoading: homeSelectors.selectIsLoading(state),
    availableRides: homeSelectors.selectAvailableRides(
      state,
      driverSelectors.selectDriverId(state),
    ),
    selectedRide: homeSelectors.selectRideById(
      state,
      driverSelectors.selectSelectedRideId(state),
    ),
    driverId: driverSelectors.selectDriverId(state),
    currentLocation: driverSelectors.selectCurrentLocation(state),
    driverRating: driverSelectors.selectRating(state),
    rideError: homeSelectors.selectError(state),
    driverError: driverSelectors.selectError(state),
  };
};

const mapDispatchToProps = {
  setIsOnline: homeActions.setIsOnline,
  setMapRegion: homeActions.setMapRegion,
  fetchRidesNearMe: homeActions.fetchRidesNearMe,
  setRideStatus: homeActions.setRideStatus,
  setCurrentLocation: driverActions.setCurrentLocation,
  fetchProfile: driverActions.fetchProfile,
  setSelectedRideId: driverActions.setSelectedRideId,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
