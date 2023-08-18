import { TouchableOpacity, View } from 'react-native';
import stylesDashboardNavbar from './styles';
import { SignOut } from 'phosphor-react-native';

export default function DashboardNavbar() {
  return (
    <View style={stylesDashboardNavbar.container}>
      <TouchableOpacity>
        <SignOut size={32} color="white" weight="bold" />
      </TouchableOpacity>
    </View>
  );
}
