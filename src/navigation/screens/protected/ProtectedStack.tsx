import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventDetailScreen from "./EventDetailScreen";
import HomeTab from "./home/HomeTab";
import ProfileEditScreen from "./ProfileEditScreen";
import SearchScreen from "./SearchScreen";

const Stack = createNativeStackNavigator();

export default function ProtectedStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeTab"
    >
      <Stack.Screen
        name="ProfileEditScreen"
        component={ProfileEditScreen}
        options={{ presentation: "card" }}
      />
      <Stack.Screen
        name="EventDetailScreen"
        component={EventDetailScreen}
        options={{ presentation: "card" }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{ presentation: "card" }}
      />
    </Stack.Navigator>
  );
}
