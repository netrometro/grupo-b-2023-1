import { View } from 'react-native';
import stylesAdminRegistration from './styles';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function AdminRegistration() {
  return (
    <View style={stylesAdminRegistration.container}>
      <Navbar onPressArrowLeft={() => {}} text="Cadastre-se" />
      <View style={stylesAdminRegistration.body}>
        <View style={stylesAdminRegistration.inputs}>
          <Input error={false} label="E-mail:" placeholder="email@email.com" onChange={() => {}} />
          <Input error={false} label="Senha:" placeholder="********" onChange={() => {}} />
          <Input error={false} label="Nome:" placeholder="Nome Completo" onChange={() => {}} />
          <Input error={false} label="CPF:" placeholder="000.000.000-00" onChange={() => {}} />
        </View>
        <Button text="CADASTRAR" onPress={() => {}} />
      </View>
    </View>
  );
}
