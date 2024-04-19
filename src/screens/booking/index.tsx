import React, { Component, ReactNode } from "react";
import { StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import BaseView from "components/BaseView";
import ViewComponent from "components/ViewComponent";
import SVG from "components/SVG";
import svg from "assets/svg";
import { NavigationProps, Ride } from "interfaces";
import TimerClose from "./components/TimerClose";
import { RootState } from "store";
import homeActions from "store/actions/home";
import driverSelectors from "store/selectors/driver";
import driverActions from "store/actions/driver";

interface BookingScreenProps extends NavigationProps {
  driverId?: string;
  setRideStatus: typeof homeActions.setRideStatus;
  setSelectedRideId: typeof driverActions.setSelectedRideId;
}

interface BookingScreenState {
  ride?: Ride;
}

class BookingScreen extends Component<BookingScreenProps, BookingScreenState> {
  constructor(props: BookingScreenProps) {
    super(props);

    this.state = { ride: props.route?.params?.data };
  }

  render(): ReactNode {
    const { ride } = this.state;

    return (
      <BaseView style={styles.container}>
        <ViewComponent style={{ flex: 1 }} />
        <ViewComponent style={styles.popupContainer}>
          <Text style={styles.priceText}>
            ₱{ride?.estimatedFare?.toFixed(2)}
          </Text>
          <TimerClose
            style={styles.closeButton}
            timeoutMS={15_000}
            onPress={this.closeOnPress}
          />
          <ViewComponent
            style={{ ...styles.ratingContainer, marginBottom: 20 }}
          >
            <SVG svg={svg.starIC} fill={"black"} height={16} width={16} />
            <Text style={styles.ratingText}>{ride?.userRating}</Text>
          </ViewComponent>
          <ViewComponent style={{ flexDirection: "row" }}>
            <ViewComponent style={{ width: 24 }} />
            <ViewComponent style={{ flex: 1 }}>
              <ViewComponent>
                <Text style={{ ...styles.contentText, marginBottom: 4 }}>
                  {ride?.driverToPickupDurationReadable} (
                  {ride?.driverToPickupDistanceReadable}) away
                </Text>
                <Text style={{ position: "absolute", left: -18, fontSize: 30 }}>
                  •
                </Text>
                <Text
                  style={{ ...styles.contentText, marginBottom: 16 }}
                  numberOfLines={2}
                  ellipsizeMode="middle"
                >
                  {ride?.pickupLocation?.name}
                </Text>
              </ViewComponent>
              <ViewComponent>
                <Text style={{ ...styles.contentText, marginBottom: 4 }}>
                  {ride?.pickupToDestinationDurationReadable} (
                  {ride?.pickupToDestinationDistanceReadable}) trip
                </Text>
                <Text style={{ position: "absolute", left: -18, fontSize: 30 }}>
                  •
                </Text>
                <Text
                  style={{ ...styles.contentText, marginBottom: 20 }}
                  numberOfLines={2}
                  ellipsizeMode="middle"
                >
                  {ride?.destination?.name}
                </Text>
              </ViewComponent>
            </ViewComponent>
          </ViewComponent>
          <ViewComponent
            style={styles.acceptButton}
            onPress={this.acceptOnPress}
          >
            <Text style={styles.acceptText}>Accept</Text>
          </ViewComponent>
        </ViewComponent>
      </BaseView>
    );
  }

  private closeOnPress = () => {
    const { driverId } = this.props;
    const { ride } = this.state;

    if (ride?.id) {
      this.props.setRideStatus({ id: ride.id, status: "declined", driverId });
    }
    this.props.setSelectedRideId(undefined);
    this.props.navigation?.goBack();
  };

  private acceptOnPress = () => {
    const { driverId } = this.props;
    const { ride } = this.state;

    if (ride?.id) {
      this.props.setRideStatus({ id: ride.id, status: "accepted", driverId });
    }
    this.props.navigation?.goBack();
  };
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  popupContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#30e54e",
    backgroundColor: "white",
    margin: 16,
    padding: 12,
  },
  closeButton: {
    position: "absolute",
    right: 0,
    margin: 16,
    height: 40,
    width: 40,
  },
  contentText: { color: "black", fontSize: 14, fontWeight: "500" },
  priceText: {
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  ratingText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4,
  },
  acceptButton: {
    height: 48,
    backgroundColor: "#30e54e",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  acceptText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    driverId: driverSelectors.selectDriverId(state),
  };
};

const mapDispatchToProps = {
  setRideStatus: homeActions.setRideStatus,
  setSelectedRideId: driverActions.setSelectedRideId,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingScreen);
