import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import AdminRegistration from '../screens/AdminRegistration';
import AdminEditInfo from '../screens/AdminEditInfo';
import FichaRegistration from '../screens/FichaRegistration';
import CompanyRegistration from '../screens/CompanyRegistration';
import CompanyDashboard from '../screens/CompanyDashboard';
import EditEmployer from '../screens/EditEmployer';

export type RootStackParamList = {
  login: undefined;
  adminRegistration: undefined;
  dashboard: undefined;
  adminEditInfo: undefined;
  companyRegistration: undefined;
  companyDashboard: { companyId: number };
  fichaRegistration: { companyId: number };
  editEmployer: { companyId: number; employeeId: number };
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export default function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="adminRegistration" component={AdminRegistration} />
      <Screen name="dashboard" component={Dashboard} />
      <Screen name="adminEditInfo" component={AdminEditInfo} />
      <Screen name="fichaRegistration" component={FichaRegistration} />
      <Screen name="companyRegistration" component={CompanyRegistration} />
      <Screen name="companyDashboard" component={CompanyDashboard} />
      <Screen name="editEmployer" component={EditEmployer} />
    </Navigator>
  );
}
