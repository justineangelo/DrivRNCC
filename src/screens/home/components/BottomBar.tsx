import React, { Component, ReactNode } from "react";
import { Animated, StyleSheet } from "react-native";
import ViewComponent from "components/ViewComponent";
import OnlineButton from "./OnlineButton";
import NavigationBar from "./NavigationBar";
import LayerButton from "./LayerButton";
import RideProgressView, { MenuAction } from "./RideProgressView";
import { Ride } from "interfaces";

interface BottomBarProps {
  isLoading?: boolean;
  isOnline?: boolean;
  selectedRide?: Ride;
  onlineOnPress: () => void;
  menuActionOnPress?: (action: MenuAction) => void;
}

class BottomBar extends Component<BottomBarProps> {
  render(): ReactNode {
    const {
      isLoading,
      isOnline,
      selectedRide,
      onlineOnPress,
      menuActionOnPress,
    } = this.props;

    return (
      <ViewComponent style={styles.container}>
        {selectedRide && selectedRide.status == "accepted" ? (
          <Animated.View style={styles.progressContainer}>
            <RideProgressView
              ride={selectedRide}
              menuActionOnPress={menuActionOnPress}
            />
          </Animated.View>
        ) : (
          <Animated.View style={styles.navContainer}>
            <OnlineButton isOnline={isOnline} onPress={onlineOnPress} />
            <LayerButton style={{ position: "absolute", right: 0 }} />
            <NavigationBar isLoading={isLoading} />
          </Animated.View>
        )}
      </ViewComponent>
    );
  }
}

export { MenuAction };

export default BottomBar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  navContainer: { flex: 1, alignItems: "center", margin: 16 },
  progressContainer: {},
});
