import { TouchableOpacity, View } from 'react-native';
import stylesDashboardNavbar from './styles';
import { SignOut } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardNavbar() {
  type Nav = {
    navigate: (value: string) => void;
  };

  const { navigate } = useNavigation<Nav>();

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('adminId');
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
