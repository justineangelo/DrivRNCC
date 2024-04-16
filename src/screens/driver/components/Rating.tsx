import React, { Component, ReactNode } from "react";
import { StyleSheet, Text, ViewStyle } from "react-native";
import SVG from "components/SVG";
import ViewComponent from "components/ViewComponent";
import svg from "assets/svg";

interface Props {
  style?: ViewStyle;
  rating?: number;
}

class Rating extends Component<Props> {
  render(): ReactNode {
    const { style, rating } = this.props;

    return (
      <ViewComponent style={{ ...styles.container, ...style }}>
        <ViewComponent style={styles.imageContainer}>
          <SVG svg={svg.userIC} fill={"black"} height={60} width={60} />
        </ViewComponent>
        <ViewComponent style={styles.ratingContainer}>
          <SVG svg={svg.starIC} fill={"gold"} height={20} width={20} />
          <Text style={styles.ratingText}>{rating?.toFixed(2)}</Text>
        </ViewComponent>
      </ViewComponent>
    );
  }
}

export default Rating;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  imageContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "#F4FBFB",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
  },
  ratingContainer: {
    position: "absolute",
    top: 50,
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
    textTransform: "uppercase",
  },
});
