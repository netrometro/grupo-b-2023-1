import { View, Text, Alert, ToastAndroid, ActivityIndicator } from 'react-native';
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
import React from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  type Nav = {
    navigate: (value: string) => void;
  };

  const { navigate } = useNavigation<Nav>();

  const data = {
    email: email,
    senha: password,
  };

  const handleClickLogin = async () => {
    try {
      setIsLoading(true);
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (emailRegex.test(email) && password.length >= 8) {
        const response = await api.post('/auth', data);
        await AsyncStorage.setItem('adminId', String(response.data.id));
        navigate('dashboard');
      } else {
        ToastAndroid.show('E-mail/Senha fora dos padrões', ToastAndroid.LONG);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Erro', 'Ocorreu um erro, verifique o e-mail e a senha e tente novamente.');
    }
  };

  const handleRegister = () => {
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
        {isLoading ? (
          <ActivityIndicator size="large" color="#4F67D8" style={stylesLogin.loadingContainer} />
        ) : (
          <View style={stylesLogin.buttonContainer}>
            <LoginButton onPress={handleClickLogin} />
            <SignUpButton onPress={handleRegister} />
          </View>
        )}
      </View>
    </View>
  );
}
