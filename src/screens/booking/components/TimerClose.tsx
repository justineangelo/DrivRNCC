import React, { Component, ReactNode } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import * as Progress from "react-native-progress";
import { Entypo } from "@expo/vector-icons";
import ViewComponent from "components/ViewComponent";

interface TimerCloseProps {
  style?: ViewStyle;
  timeoutMS?: number;
  onPress?: () => void;
}

interface TimerCloseState {
  progress: number;
}

class TimerClose extends Component<TimerCloseProps, TimerCloseState> {
  constructor(props: TimerCloseProps) {
    super(props);

    this.state = { progress: 0 };
  }
  private timer?: NodeJS.Timeout;

  componentDidMount(): void {
    const { timeoutMS } = this.props;

    if (timeoutMS) {
      this.startTimer();
    }
  }

  componentDidUpdate(prevProps: Readonly<TimerCloseProps>): void {
    const { timeoutMS, onPress } = this.props;
    const { progress } = this.state;

    if (progress >= 1) {
      this.timer && clearInterval(this.timer);
      onPress && onPress();
    }
    if (prevProps.timeoutMS != timeoutMS && timeoutMS) {
      this.startTimer();
    }
  }

  componentWillUnmount(): void {
    this.timer && clearInterval(this.timer);
  }

  render(): ReactNode {
    const { style, onPress } = this.props;
    const { progress } = this.state;

    return (
      <ViewComponent
        style={{ ...styles.container, ...style }}
        onPress={onPress}
      >
        <Progress.Circle
          style={{ position: "absolute" }}
          progress={progress}
          textStyle={{ fontSize: 20 }}
          color="black"
        />
        <Entypo name="cross" size={30} color={"black"} />
      </ViewComponent>
    );
  }

  private startTimer() {
    this.timer && clearInterval(this.timer);
    this.timer = setInterval(() => {
      const { timeoutMS } = this.props;
      const { progress } = this.state;
      const nProgress = progress * timeoutMS!;
      this.setState({ progress: (nProgress + 100) / timeoutMS! });
    }, 100);
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TimerClose;
