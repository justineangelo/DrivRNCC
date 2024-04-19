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

interface BottomBarState {
  navTranslateY: Animated.Value;
}

class BottomBar extends Component<BottomBarProps, BottomBarState> {
  constructor(props: BottomBarProps) {
    super(props);

    this.state = { navTranslateY: new Animated.Value(0) };
  }

  componentDidUpdate(prevProps: Readonly<BottomBarProps>): void {
    const { selectedRide } = this.props;

    if (prevProps.selectedRide != selectedRide) {
      this.animate();
    }
  }

  render(): ReactNode {
    const {
      isLoading,
      isOnline,
      selectedRide,
      onlineOnPress,
      menuActionOnPress,
    } = this.props;
    const { navTranslateY } = this.state;

    return (
      <ViewComponent style={styles.container}>
        {selectedRide && selectedRide.status == "accepted" ? (
          <ViewComponent style={styles.progressContainer}>
            <RideProgressView
              ride={selectedRide}
              menuActionOnPress={menuActionOnPress}
            />
          </ViewComponent>
        ) : null}
        <Animated.View
          style={{
            ...styles.navContainer,
            transform: [{ translateY: navTranslateY }],
          }}
        >
          <OnlineButton isOnline={isOnline} onPress={onlineOnPress} />
          <LayerButton style={{ position: "absolute", right: 0 }} />
          <NavigationBar isLoading={isLoading} />
        </Animated.View>
      </ViewComponent>
    );
  }

  private animate = () => {
    const { selectedRide } = this.props;
    const { navTranslateY } = this.state;

    Animated.timing(navTranslateY, {
      toValue: selectedRide ? 500 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {});
  };
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
  progressContainer: { position: "absolute", left: 0, right: 0, bottom: 0 },
});
