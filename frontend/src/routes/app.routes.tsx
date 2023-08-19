import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import AdminRegistration from '../screens/AdminRegistration';
import AdminEditInfo from '../screens/AdminEditInfo';

// export type RootStackParamList = {
//   login: undefined;
//   adminRegistration: undefined;
//   dashboard: undefined;
//   adminEditInfo: undefined;
// };

// const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();
const { Navigator, Screen } = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="adminRegistration" component={AdminRegistration} />
      <Screen name="dashboard" component={Dashboard} />
      <Screen name="adminEditInfo" component={AdminEditInfo} />
    </Navigator>
  );
}
