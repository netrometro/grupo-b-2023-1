import { ActivityIndicator, Alert, ToastAndroid, View } from 'react-native';
import stylesAdminRegistration from './styles';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useState } from 'react';
import PasswordInput from '../../components/PasswordInput';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import React from 'react';
import MaskedInput from '../../components/MaskedInput';

export default function AdminRegistration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [cpf, setCpf] = useState('');
  const [errorCpf, setErrorCpf] = useState(true);
  const [errorUsername, setErrorUsername] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);
  const [errorEmail, setErrorEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  type Nav = {
    navigate: (value: string) => void;
  };

  const { navigate } = useNavigation<Nav>();

  const data = {
    email: email,
    senha: password,
    nome: username,
    cpf: cpf,
  };

  const handleSignUp = async () => {
    if (!errorCpf && !errorUsername && !errorEmail && !errorPassword && true) {
      try {
        setIsLoading(true);
        await api.post('/admin', data);
        navigate('login');
        ToastAndroid.show('Cadastrado com sucesso!', ToastAndroid.LONG);
        setIsLoading(false);
      } catch (error) {
        Alert.alert('Erro', 'E-mail ou CPF já cadastrado.');
        setIsLoading(false);
      }
    } else {
      ToastAndroid.show('Preencha todos os campos!', ToastAndroid.LONG);
    }
  };

  const onChangeCpf = (value: string) => {
    setCpf(value);
    setErrorCpf(value.length != 14);
  };

  const onChangeUsername = (value: string) => {
    setUsername(value);
    setErrorUsername(value.length < 4);
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
    setErrorPassword(value.length < 8);
  };

  const onChangeEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setEmail(value);
    setErrorEmail(!emailRegex.test(value));
  };

  return (
    <View style={stylesAdminRegistration.container}>
      <Navbar
        onPressArrowLeft={() => {
          navigate('login');
        }}
        text="Cadastre-se"
      />
      <View style={stylesAdminRegistration.body}>
        <View style={stylesAdminRegistration.inputs}>
          <Input
            error={errorEmail}
            label="E-mail:"
            keyboardType="email-address"
            placeholder="email@email.com"
            onChange={(value: string) => onChangeEmail(value)}
            value={email}
            errorMessage="*Insira um e-mail válido"
          />
          <PasswordInput
            error={errorPassword}
            label="Senha:"
            onChange={(value: string) => onChangePassword(value)}
            placeholder="********"
            value={password}
            errorMessage="*A senha precisa ter pelo menos 8 caracteres"
          />
          <Input
            error={errorUsername}
            label="Nome:"
            placeholder="Nome Completo"
            onChange={(value: string) => onChangeUsername(value)}
            value={username}
            errorMessage="*O nome precisa ter pelo menos 4 caracteres"
          />
          <MaskedInput
            error={errorCpf}
            label="CPF:"
            mask="999.999.999-99"
            placeholder="000.000.000-00"
            onChange={(value: string) => onChangeCpf(value)}
            value={cpf}
            keyboardType="numeric"
            errorMessage="*Insira um CPF válido"
          />
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#4F67D8" />
        ) : (
          <Button text="CADASTRAR" onPress={handleSignUp} />
        )}
      </View>
    </View>
  );
}
