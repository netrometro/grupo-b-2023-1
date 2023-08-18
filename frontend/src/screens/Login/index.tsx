import { View, Text } from 'react-native';
import stylesLogin from './styles';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';

export default function Login() {
  return (
    <View style={stylesLogin.container}>
      <View style={stylesLogin.background}>
        <Logo />
      </View>
      <View style={stylesLogin.loginBox}>
        <Text style={stylesLogin.tagLine}>Modernize, Otimize, Controle!</Text>
        <View style={stylesLogin.inputs}>
          <Input label="E-mail:" placeholder="email@email.com" onChange={() => {}} error={false} />
          <PasswordInput label="Senha:" placeholder="********" onChange={() => {}} error={false} />
        </View>
      </View>
    </View>
  );
}
