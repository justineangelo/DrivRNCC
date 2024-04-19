import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "screens/home";
import BookingScreen from "screens/booking";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="BookingScreen"
        component={BookingScreen}
        options={{ presentation: "transparentModal" }}
      />
    </Stack.Navigator>
  );
};
