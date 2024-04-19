import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import * as Progress from "react-native-progress";
import ViewComponent from "components/ViewComponent";
import SVG from "components/SVG";
import svg from "assets/svg";

interface NavigationBarProps {
  isLoading?: boolean;
  autoAcceptOnPress?: () => void;
}

class NavigationBar extends Component<NavigationBarProps> {
  render(): React.ReactNode {
    const { isLoading, autoAcceptOnPress } = this.props;

    return (
      <ViewComponent style={styles.container}>
        {isLoading ? (
          <Progress.Bar
            height={2}
            width={null}
            borderWidth={0}
            indeterminate={true}
          />
        ) : (
          <ViewComponent style={{ height: 2 }} />
        )}
        <ViewComponent style={styles.tab}>
          <DummyButton title="Service" svg={svg.carIC} />
          <DummyButton title="My Destination" svg={svg.pinIC} />
          <DummyButton title="Diagnosis" svg={svg.settingsIC} />
          <DummyButton
            title="Auto Accept"
            svg={svg.autoIC}
            onPress={autoAcceptOnPress}
          />
          <DummyButton title="More" svg={svg.moreIC} />
        </ViewComponent>
      </ViewComponent>
    );
  }
}

const DummyButton = (props: {
  title: string;
  enabled?: boolean;
  svg: { element: JSX.Element; viewBox: string };
  onPress?: () => void;
}) => {
  return (
    <ViewComponent
      style={{ ...styles.button, opacity: props.enabled ? 1 : 0.5 }}
      onPress={props.onPress}
    >
      <ViewComponent style={styles.iconContainer}>
        <SVG svg={props.svg} fill={"black"} height={20} width={20} />
      </ViewComponent>
      <Text style={styles.buttonTitle} numberOfLines={3}>
        {props.title}
      </Text>
    </ViewComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    overflow: "hidden",
  },
  tab: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
  button: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 2,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#F4FBFB",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 3,
    marginBottom: 5,
  },
  buttonTitle: {
    color: "black",
    fontSize: 11,
    textTransform: "uppercase",
    textAlign: "center",
  },
});

export default NavigationBar;
