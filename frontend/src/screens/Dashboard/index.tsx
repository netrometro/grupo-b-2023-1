import { View } from 'react-native';
import stylesDashboard from './styles';
import DashboardNavbar from './components/DashboarNavbar';

export default function Dashboard() {
  return (
    <View style={stylesDashboard.container}>
      <DashboardNavbar />
    </View>
  );
}
