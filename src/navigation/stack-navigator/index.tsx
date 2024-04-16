import { createStackNavigator } from "@react-navigation/stack";
import DriverScreen from "screens/driver";
import BookingScreen from "screens/booking";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DriverScreen" component={DriverScreen} />
      <Stack.Screen
        name="BookingScreen"
        component={BookingScreen}
        options={{ presentation: "transparentModal" }}
      />
    </Stack.Navigator>
  );
};
