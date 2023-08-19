import { TouchableOpacity, View } from 'react-native';
import stylesDashboardNavbar from './styles';
import { SignOut } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

export default function DashboardNavbar() {
  type Nav = {
    navigate: (value: string) => void;
  };

  const { navigate } = useNavigation<Nav>();

  const handleSignOut = () => {
    console.log('saindo');
    navigate('login');
  };

  return (
    <View style={stylesDashboardNavbar.container}>
      <TouchableOpacity onPress={handleSignOut}>
        <SignOut size={32} color="white" weight="bold" />
      </TouchableOpacity>
    </View>
  );
}
