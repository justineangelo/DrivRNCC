import React, { Component, ReactNode } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { RootState } from "store";
import rideSelectors from "store/selectors/ride";
import rideActions from "store/actions/ride";
import driverSelectors from "store/selectors/driver";
import { NavigationProps } from "interfaces";
import MapView, { Marker } from "react-native-maps";
import BaseView from "components/BaseView";
import ViewComponent from "components/ViewComponent";
import Rating from "./components/Rating";
import BottomBar from "./components/BottomBar";
import Toast from "react-native-root-toast";

interface DriverScreenProps extends NavigationProps {
  isOnline?: boolean;
  rating?: number;
  setIsOnline: typeof rideActions.setIsOnline;
}

interface DriverScreenState {
  isLoading: boolean;
}

class DriverScreen extends Component<DriverScreenProps, DriverScreenState> {
  constructor(props: DriverScreenProps) {
    super(props);

    this.state = { isLoading: false };
  }

  private toast?: any;

  render(): ReactNode {
    const { isOnline } = this.props;
    const { isLoading } = this.state;

    return (
      <BaseView useSafeArea={true} style={styles.container}>
        <ViewComponent style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 14.592823,
              longitude: 121.001227,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            minZoomLevel={12}
            onPress={this.mapOnPress}
          >
            {/* TODO */}
          </MapView>
          <Rating
            style={{ position: "absolute", right: 16, top: 16 }}
            rating={5.0}
          />
          <BottomBar
            isLoading={isLoading}
            isOnline={isOnline}
            onlineOnPress={this.onlineOnPress}
          />
        </ViewComponent>
      </BaseView>
    );
  }

  private mapOnPress = () => {
    console.log("map onPress");
    this.props.navigation?.navigate("BookingScreen");
  };

  private onlineOnPress = () => {
    const { isOnline } = this.props;
    const { isLoading } = this.state;

    if (!isLoading) {
      this.toast && Toast.hide(this.toast);
      this.setState({ isLoading: true });
      setTimeout(() => {
        this.props.setIsOnline(!isOnline);
        this.setState({ isLoading: false });
      }, 200);
      if (!isOnline) {
        this.toast = Toast.show("You are now online.", {
          duration: Toast.durations.SHORT,
        });
      }
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    isOnline: rideSelectors.selectIsOnline(state),
    rating: driverSelectors.selectRating(state),
  };
};

const mapDispatchToProps = { setIsOnline: rideActions.setIsOnline };

export default connect(mapStateToProps, mapDispatchToProps)(DriverScreen);
