import { View } from 'react-native';
import stylesDashboard from './styles';
import DashboardNavbar from './components/DashboarNavbar';
import Button from '../../components/Button';

export default function Dashboard() {
  return (
    <View style={stylesDashboard.container}>
      <DashboardNavbar />
      <View>
        <Button onPress={() => {}} text="Minhas informações" />
      </View>
    </View>
  );
}
