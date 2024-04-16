import React, { Component, ReactNode } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import SVG from "components/SVG";
import ViewComponent from "components/ViewComponent";
import svg from "assets/svg";

interface Props {
  style?: ViewStyle;
  onPress?: () => void;
}

class LayerButton extends Component<Props> {
  render(): ReactNode {
    const { style, onPress } = this.props;

    return (
      <ViewComponent
        style={{ ...styles.container, ...style }}
        onPress={onPress}
      >
        <SVG svg={svg.layerIC} fill={"black"} height={20} width={20} />
      </ViewComponent>
    );
  }
}

export default LayerButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#F4FBFB",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
  },
});
