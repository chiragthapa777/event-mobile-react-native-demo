import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingFeature from './OnboardingFeature';
import OnboardingWelcome from './OnboardingWelcome';

const Stack = createNativeStackNavigator();

export default function OnBoardingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='OnboardingWelcome'>
      <Stack.Screen name="OnboardingWelcome" component={OnboardingWelcome} />
      <Stack.Screen name="OnboardingFeature" component={OnboardingFeature} />
    </Stack.Navigator>
  );
}
