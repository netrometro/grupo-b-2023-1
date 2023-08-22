import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import AdminRegistration from '../screens/AdminRegistration';
import AdminEditInfo from '../screens/AdminEditInfo';
import CompanyRegistration from '../screens/CompanyRegistration';
import EmployeeList from '../screens/EmployeeList';
import { Emp } from '../interfaces/emp';
import SingleCompany from '../screens/CompanyDashboard';
import CompanyDashboard from '../screens/CompanyDashboard';

 export type RootStackParamList = {
   login: undefined;
   adminRegistration: undefined;
   dashboard: undefined;
   adminEditInfo: undefined;
   companyRegistration: undefined;
   companyDashboard: { companyId: number};
 };

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

/* const { Navigator, Screen } = createNativeStackNavigator(); */

export default function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="adminRegistration" component={AdminRegistration} />
      <Screen name="dashboard" component={Dashboard} />
      <Screen name="adminEditInfo" component={AdminEditInfo} />
      <Screen name="companyRegistration" component={CompanyRegistration}/>
      <Screen name='companyDashboard' component={CompanyDashboard} />
    </Navigator>
  );
}
