import { View, Text } from 'react-native';
import stylesLogin from './styles';
import Logo from '../../components/Logo';

export default function Login() {
  return (
    <View style={stylesLogin.container}>
      <View style={stylesLogin.background}>
        <Logo />
      </View>
      <View style={stylesLogin.loginBox}></View>
    </View>
  );
}
