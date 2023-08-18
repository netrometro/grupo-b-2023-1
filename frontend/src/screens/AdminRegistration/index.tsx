import { View } from 'react-native';
import stylesAdminRegistration from './styles';
import Navbar from '../../components/Navbar';

export default function AdminRegistration() {
  return (
    <View style={stylesAdminRegistration.container}>
      <Navbar onPressArrowLeft={() => {}} text="Cadastre-se" />
    </View>
  );
}
