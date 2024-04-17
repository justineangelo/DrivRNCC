import React, { Component, LegacyRef, ReactNode } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { RootState } from "store";
import rideSelectors from "store/selectors/ride";
import rideActions from "store/actions/ride";
import driverSelectors from "store/selectors/driver";
import { Location, NavigationProps, Ride } from "interfaces";
import MapView, { MapMarker, MarkerPressEvent } from "react-native-maps";
import BaseView from "components/BaseView";
import ViewComponent from "components/ViewComponent";
import Rating from "./components/Rating";
import BottomBar from "./components/BottomBar";
import Toast from "react-native-root-toast";
import SVG from "components/SVG";
import svg from "assets/svg";
import MapViewDirections from "react-native-maps-directions";
import driverActions from "store/actions/driver";

interface DriverScreenProps extends NavigationProps {
  isOnline?: boolean;
  currentLocation?: Location;
  rating?: number;
  isRideLoading?: boolean;
  rides?: Ride[];
  setCurrentLocation: typeof driverActions.setCurrentLocation;
  setIsOnline: typeof rideActions.setIsOnline;
  fetchRidesNearMe: any /*typeof rideActions.fetchRidesNearMe*/;
  fetchProfile: any /*typeof driverActions.fetchProfile*/;
}

class DriverScreen extends Component<DriverScreenProps> {
  constructor(props: DriverScreenProps) {
    super(props);

    this.state = { isLoading: false };
  }
  private toast?: any;

  componentDidMount(): void {
    this.props.setCurrentLocation(this.getCurrentLocation()); //set dummy location
    this.props.fetchProfile();
  }

  componentDidUpdate(prevProps: Readonly<DriverScreenProps>): void {
    if (
      prevProps.isOnline != this.props.isOnline &&
      this.props.isOnline &&
      this.props.currentLocation
    ) {
      this.props.fetchRidesNearMe(this.props.currentLocation);
    }
  }

  render(): ReactNode {
    const { isOnline, rating, isRideLoading, rides, currentLocation } =
      this.props;

    return (
      <BaseView useSafeArea={true} style={styles.container}>
        <ViewComponent style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            {...(currentLocation
              ? {
                  region: {
                    ...currentLocation,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  },
                }
              : null)}
            minZoomLevel={5}
          >
            {isOnline &&
              rides?.map((ride, index) => (
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
                    height={40}
                    width={40}
                  />
                </MapMarker>
              ))}
            {currentLocation ? (
              <MapMarker coordinate={currentLocation}>
                <SVG svg={svg.carIC} fill={"black"} height={30} width={30} />
              </MapMarker>
            ) : null}
            {/* <MapViewDirections 
              origin={{ latitude: 14.592823, longitude: 121.001227 }}
              destination={{
                latitude: 14.618058749021479,
                longitude: 120.98414342358804,
              }}
              apikey={"AIzaSyBMEOZj6bbZH6bY6jC6yyYjnDFoIaY3Los"}
              strokeWidth={3}
              strokeColor="red"
            /> */}
          </MapView>
          <Rating
            style={{ position: "absolute", right: 16, top: 16 }}
            rating={rating}
          />
          <BottomBar
            isLoading={isRideLoading}
            isOnline={isOnline}
            onlineOnPress={this.onlineOnPress}
          />
        </ViewComponent>
      </BaseView>
    );
  }

  private marketOnPress = (event: MarkerPressEvent) => {
    console.log("marketOnPress: ", event.nativeEvent);
    this.props.navigation?.navigate("BookingScreen");
  };

  private onlineOnPress = () => {
    const { isOnline, isRideLoading } = this.props;

    if (!isRideLoading) {
      this.toast && Toast.hide(this.toast);
      this.props.setIsOnline(!isOnline);
      if (!isOnline) {
        this.toast = Toast.show("You are now online.", {
          duration: Toast.durations.SHORT,
        });
      }
    }
  };

  //generated dummy current location
  private getCurrentLocation = (): Location => {
    return { latitude: 14.614406139110221, longitude: 120.98382688850407 };
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
    isRideLoading: rideSelectors.selectIsLoading(state),
    isOnline: rideSelectors.selectIsOnline(state),
    currentLocation: driverSelectors.selectCurrentLocation(state),
    rating: driverSelectors.selectRating(state),
    rides: rideSelectors.selectPendingRides(state),
  };
};

const mapDispatchToProps = {
  setIsOnline: rideActions.setIsOnline,
  setCurrentLocation: driverActions.setCurrentLocation,
  fetchProfile: driverActions.fetchProfile,
  fetchRidesNearMe: rideActions.fetchRidesNearMe,
};

export default connect(mapStateToProps, mapDispatchToProps)(DriverScreen);
