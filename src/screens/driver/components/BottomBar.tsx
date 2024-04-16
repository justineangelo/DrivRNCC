import React, { Component, ReactNode } from "react";
import { Animated, StyleSheet } from "react-native";
import ViewComponent from "components/ViewComponent";
import OnlineButton from "./OnlineButton";
import DummyNavigationBar from "./DummyNavigationBar";
import LayerButton from "./LayerButton";

interface BottomBarProps {
  isLoading?: boolean;
  isOnline?: boolean;
  onlineOnPress: () => void;
}

class BottomBar extends Component<BottomBarProps> {
  render(): ReactNode {
    const { isLoading, isOnline, onlineOnPress } = this.props;

    return (
      <ViewComponent style={styles.container}>
        <OnlineButton
          isLoading={isLoading}
          isOnline={isOnline}
          onPress={onlineOnPress}
        />
        <LayerButton style={{ position: "absolute", right: 0 }} />
        <DummyNavigationBar />
      </ViewComponent>
    );
  }
}

export default BottomBar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    left: 0,
    right: 0,
    bottom: 0,
    margin: 16,
  },
});
