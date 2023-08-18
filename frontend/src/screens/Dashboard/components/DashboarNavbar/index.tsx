import { TouchableOpacity, View } from 'react-native';
import stylesDashboardNavbar from './styles';
import { SignOut } from 'phosphor-react-native';

export default function DashboardNavbar() {
  const handleSignOut = () => {
    console.log('saindo');
  };

  return (
    <View style={stylesDashboardNavbar.container}>
      <TouchableOpacity onPress={handleSignOut}>
        <SignOut size={32} color="white" weight="bold" />
      </TouchableOpacity>
    </View>
  );
}
