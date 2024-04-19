import React, { Component, ReactNode } from "react";
import { Alert, StyleSheet, Text, ViewProps } from "react-native";
import svg from "assets/svg";
import SVG from "components/SVG";
import ViewComponent from "components/ViewComponent";
import { Ride } from "interfaces";

export type MenuAction = "cancel ride";

interface RideProgressViewProps {
  style?: ViewProps;
  ride?: Ride;
  menuActionOnPress?: (action: MenuAction) => void;
}

class RideProgressView extends Component<RideProgressViewProps> {
  render(): ReactNode {
    const { style, ride } = this.props;

    return (
      <ViewComponent style={{ ...styles.container, ...style }}>
        <ViewComponent>
          <SVG svg={svg.controlIC} height={20} width={20} />
        </ViewComponent>
        <ViewComponent style={{ flex: 1, alignItems: "center" }}>
          <ViewComponent style={styles.infoContainer}>
            <Text style={{ ...styles.text, flex: 1, textAlign: "right" }}>
              {ride?.pickupToDestinationDurationReadable}
            </Text>
            <SVG
              style={{ margin: 8 }}
              svg={svg.personIC}
              height={30}
              width={30}
              fill={"#30e54e"}
            />
            <Text style={{ ...styles.text, flex: 1, textAlign: "left" }}>
              {ride?.pickupToDestinationDistanceReadable}
            </Text>
          </ViewComponent>
          <Text style={styles.rideText}>
            {this.statusReadable(ride)} {ride?.name}
          </Text>
        </ViewComponent>
        <ViewComponent onPress={this.menuOnPress}>
          <SVG svg={svg.menuIC} height={20} width={20} fill={"black"} />
        </ViewComponent>
      </ViewComponent>
    );
  }

  private menuOnPress = () => {
    const { menuActionOnPress } = this.props;

    Alert.alert("Simple Menu", undefined, [
      {
        text: "Cancel Ride",
        onPress: () => menuActionOnPress && menuActionOnPress("cancel ride"),
      },
      {
        text: "Go To Pickup location",
        onPress: () => Alert.alert("TODO"),
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  private statusReadable = (ride?: Ride) => {
    switch (ride?.status) {
      case "accepted":
        return "Picking up";
      case "picked-up":
        return "Dropping off";
      default:
        return "TODO status";
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    height: 80,
    paddingHorizontal: 16,
  },
  infoContainer: { flexDirection: "row", alignItems: "center", height: 40 },
  text: {
    color: "black",
    fontSize: 18,
    marginLeft: 4,
  },
  rideText: {
    color: "#8194AC",
    fontSize: 14,
  },
});

export default RideProgressView;
