import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileEditScreen from "./ProfileEditScreen";
import HomeTab from "./home/HomeTab";

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
        options={{ presentation: "fullScreenModal" }}
      />
      <Stack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{ presentation: "fullScreenModal" }}
      />
    </Stack.Navigator>
  );
}
