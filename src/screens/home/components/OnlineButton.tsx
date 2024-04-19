import React, { Component, ReactNode } from "react";
import {
  ActivityIndicator,
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import SVG from "components/SVG";
import ViewComponent from "components/ViewComponent";
import svg from "assets/svg";

interface OnlineButtonProps {
  style?: ViewStyle;
  isOnline?: boolean;
  onPress?: () => void;
}

interface OnlineButtonState {
  currentX: number;
  translateX: Animated.Value;
}

class OnlineButton extends Component<OnlineButtonProps, OnlineButtonState> {
  constructor(props: OnlineButtonProps) {
    super(props);

    this.state = { currentX: 0, translateX: new Animated.Value(0) };
  }

  componentDidMount(): void {
    this.animate();
  }

  componentDidUpdate(prevProps: Readonly<OnlineButtonProps>): void {
    if (prevProps.isOnline != this.props.isOnline) {
      this.animate();
    }
  }

  render(): ReactNode {
    const { style, isOnline, onPress } = this.props;
    const { translateX } = this.state;

    return (
      <Animated.View
        style={{ transform: [{ translateX: translateX }] }}
        onLayout={this.onLayout}
      >
        <ViewComponent
          style={{
            ...styles.container,
            ...style,
            backgroundColor: isOnline ? "#30e54e" : "#040201",
          }}
          onPress={onPress}
        >
          <SVG svg={svg.powerIC} {...styles.icon} fill={"white"} />
          {isOnline ? null : <Text style={styles.title}>Go Online </Text>}
        </ViewComponent>
      </Animated.View>
    );
  }

  private onLayout = (event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent;

    this.setState({ currentX: layout.x + 36 });
  };

  private animate = () => {
    const { isOnline } = this.props;
    const { currentX, translateX } = this.state;

    Animated.timing(translateX, {
      toValue: isOnline ? -currentX : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {});
  };
}

export default OnlineButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 40.0,
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 20.0,
  },
  icon: {
    height: 20,
    width: 20,
  },
  title: { paddingLeft: 4, fontSize: 14, fontWeight: "bold", color: "white" },
});
