import { View, Text, Alert, ToastAndroid } from 'react-native';
import stylesLogin from './styles';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';
import LoginButton from './components/LoginButton';
import SignUpButton from './components/SignUpButton';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  type Nav = {
    navigate: (value: string) => void;
  };

  const { navigate } = useNavigation<Nav>();

  const data = {
    email: email,
    senha: password,
  };

  const handleClickLogin = async () => {
    console.log(data);
    try {
      const response = await api.post('/auth', data);
      await AsyncStorage.setItem('adminId', String(response.data.id));
      navigate('dashboard');
    } catch (error) {
      console.log('deu errado');
    }
  };

  const handleLogin = () => {
    navigate('adminRegistration');
  };

  return (
    <View style={stylesLogin.container}>
      <View style={stylesLogin.background}>
        <Logo />
      </View>
      <View style={stylesLogin.loginBox}>
        <Text style={stylesLogin.tagLine}>Modernize, Otimize, Controle!</Text>
        <View style={stylesLogin.inputs}>
          <Input
            label="E-mail:"
            placeholder="email@email.com"
            onChange={(value: string) => setEmail(value)}
            error={false}
            value={email}
          />
          <PasswordInput
            label="Senha:"
            placeholder="********"
            onChange={(value: string) => setPassword(value)}
            error={false}
            value={password}
          />
        </View>
        <View>
          <LoginButton onPress={handleClickLogin} />
          <SignUpButton onPress={handleLogin} />
        </View>
      </View>
    </View>
  );
}
