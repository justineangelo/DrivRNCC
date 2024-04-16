import React, { Component, ReactNode } from "react";
import { StyleSheet, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import BaseView from "components/BaseView";
import ViewComponent from "components/ViewComponent";
import SVG from "components/SVG";
import svg from "assets/svg";

interface BookingScreenProps extends NavigationProps {}

class BookingScreen extends Component<BookingScreenProps> {
  render(): ReactNode {
    return (
      <BaseView style={styles.container}>
        <ViewComponent
          style={{
            position: "absolute",
            height: "150%",
            width: "100%",
            backgroundColor: "black",
            opacity: 0.5,
          }}
          onPress={this.closeOnPress}
        />
        <ViewComponent style={{ flex: 1 }} disabled={true} />
        <ViewComponent style={styles.popupContainer}>
          <Entypo
            style={{ position: "absolute", right: 10, top: 10, zIndex: 999 }}
            name="circle-with-cross"
            size={30}
            onPress={this.closeOnPress}
          />
          <ViewComponent style={styles.userContainer}>
            <ViewComponent style={styles.imageContainer}>
              <SVG svg={svg.userIC} fill={"black"} height={60} width={60} />
            </ViewComponent>
            <ViewComponent
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <SVG svg={svg.starIC} fill={"gold"} height={20} width={20} />
              <Text style={styles.ratingText}>{"5.00"}</Text>
            </ViewComponent>
          </ViewComponent>
          <ViewComponent style={{ alignItems: "center", marginBottom: 16 }}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>$14.55</Text>
          </ViewComponent>
          <ViewComponent style={{ flexDirection: "row", marginBottom: 16 }}>
            <ViewComponent style={styles.centerContainer}>
              <Text>4KM</Text>
            </ViewComponent>
            <ViewComponent style={styles.centerContainer}>
              <Text>CASH</Text>
            </ViewComponent>
          </ViewComponent>
          <ViewComponent
            style={{
              marginBottom: 16,
              backgroundColor: "#FBFAF4",
              borderRadius: 10,
            }}
          >
            <ViewComponent style={{ justifyContent: "center", padding: 8 }}>
              <Text style={styles.locationText}>
                73 Rd 1 Extn. San Miguel Heights, Marulas Valenzuela City
              </Text>
            </ViewComponent>
            <Entypo
              style={{ alignSelf: "center" }}
              name="chevron-down"
              size={20}
            />
            <ViewComponent
              style={{
                backgroundColor: "white",
                justifyContent: "center",
                padding: 8,
              }}
            >
              <Text style={styles.locationText}>
                73 Rd 1 Extn. San Miguel Heights, Marulas Valenzuela City
              </Text>
            </ViewComponent>
          </ViewComponent>
          <ViewComponent
            style={styles.acceptButton}
            onPress={this.acceptOnPress}
          >
            <Text style={styles.acceptText}>Accept</Text>
          </ViewComponent>
        </ViewComponent>
        <ViewComponent style={{ flex: 1 }} disabled={true} />
      </BaseView>
    );
  }

  private closeOnPress = () => {
    this.props.navigation?.goBack();
  };

  private acceptOnPress = () => {
    this.props.navigation?.goBack();
    console.log("accept job");
  };
}

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  popupContainer: {
    padding: 16,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    alignSelf: "center",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  imageContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "#F4FBFB",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    marginRight: 8,
  },
  nameText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  centerContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  ratingText: {
    color: "black",
    fontSize: 14,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  locationText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  acceptButton: {
    height: 48,
    backgroundColor: "#30e54e",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  acceptText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
