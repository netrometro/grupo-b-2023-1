import { View } from 'react-native';
import stylesDashboard from './styles';
import DashboardNavbar from './components/DashboarNavbar';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
  type Nav = {
    navigate: (value: string) => void;
  };

  const { navigate } = useNavigation<Nav>();

  const handleMyInformations = () => {
    console.log('cliquei no minhas informações');
    navigate('adminEditInfo');
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
