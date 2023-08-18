import { View } from 'react-native';
import stylesDashboard from './styles';
import DashboardNavbar from './components/DashboarNavbar';
import Button from '../../components/Button';

export default function Dashboard() {
  const handleMyInformations = () => {
    console.log('cliquei no minhas informações');
  };

  return (
    <View style={stylesDashboard.container}>
      <DashboardNavbar />
      <View style={stylesDashboard.body}>
        <Button onPress={handleMyInformations} text="Minhas informações" />
      </View>
    </View>
  );
}
