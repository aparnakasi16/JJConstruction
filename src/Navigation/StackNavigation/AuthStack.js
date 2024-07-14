import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../modules/Auth/Login';
import Signup from '../../modules/Auth/Signup';
import HomeScreen from '../../modules/Home/Home';
import BottomTab from '../BottomNavigation/BottomTab';
const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={BottomTab} />

    </Stack.Navigator>
  );
}
