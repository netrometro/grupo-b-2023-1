import { ToastAndroid, View, Text, Alert, ActivityIndicator } from 'react-native';
import stylesAdminEditInfo from './styles';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import PasswordInput from '../../components/PasswordInput';
import { useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../services/api';
import React from 'react';
import MaskedInput from '../../components/MaskedInput';
import { useScreenGuard } from '../../hooks/useScreenGuard';

export default function AdminEditInfo() {
  useScreenGuard('adminEditInfo');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [cpf, setCpf] = useState('');
  const [adminId, setAdminId] = useState('');
  const [errorCpf, setErrorCpf] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBodyLoading, setIsBodyLoading] = useState(false);

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
    if (value == '') {
      setErrorPassword(false);
    } else {
      setErrorPassword(value.length < 8);
    }
  };

  const onChangeEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setEmail(value);
    setErrorEmail(!emailRegex.test(value));
  };

  useEffect(() => {
    const admin = async () => {
      setIsBodyLoading(true);
      const id = await AsyncStorage.getItem('adminId');
      if (id !== null) {
        setAdminId(id);
      }
      try {
        const response = await api.get(`/admin/${id}`);

        setUsername(response.data.nome);
        setCpf(response.data.cpf);
        setEmail(response.data.email);
        setIsBodyLoading(false);
      } catch (error) {
        ToastAndroid.show('Ocorreu um erro ao recuperar as informações!', ToastAndroid.LONG);
        setIsBodyLoading(false);
      }
    };

    admin();
  }, []);

  type Nav = {
    navigate: (value: string) => void;
  };

  const { navigate } = useNavigation<Nav>();

  const dataWithPassword = {
    email: email,
    senha: password,
    nome: username,
    cpf: cpf,
  };

  const dataWithoutPassword = {
    email: email,
    senha: null,
    nome: username,
    cpf: cpf,
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      if (password === '') {
        if (!errorCpf && !errorUsername && !errorEmail && true) {
          await api.put(`/admin/${adminId}`, dataWithoutPassword);
        }
      } else {
        if (!errorCpf && !errorUsername && !errorEmail && !errorPassword && true) {
          await api.put(`/admin/${adminId}`, dataWithPassword);
        }
      }
      ToastAndroid.show('Dados alterados com sucesso!', ToastAndroid.LONG);
      navigate('dashboard');
      setIsLoading(false);
    } catch (error) {
      ToastAndroid.show('Ocorreu um erro!', ToastAndroid.LONG);
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await api.delete(`/admin/${adminId}`);
      await AsyncStorage.removeItem('adminId');
      ToastAndroid.show('Sua conta foi deletada!', ToastAndroid.LONG);
      navigate('login');
      setIsLoading(false);
    } catch (error) {
      ToastAndroid.show('Ocorreu um erro', ToastAndroid.LONG);
      setIsLoading(false);
    }
  };

  const handleAlert = () => {
    Alert.alert(
      'Deseja deletar a sua conta?',
      'Confirme se deseja deletar a sua conta, esta ação será irreversível.',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: handleDeleteAuthenticate,
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };

  const handleDeleteAuthenticate = async () => {
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Confirme sua identidade',
    });

    if (auth.success) {
      handleDelete();
    }
    // } else {
    //   handleDeleteAuthenticate();
    // }
  };

  return (
    <View style={stylesAdminEditInfo.container}>
      <Navbar
        onPressArrowLeft={() => {
          navigate('dashboard');
        }}
        text="Minhas informações"
      />
      <View style={stylesAdminEditInfo.body}>
        {isBodyLoading ? (
          <ActivityIndicator size="large" color="#4F67D8" />
        ) : (
          <View style={stylesAdminEditInfo.inputs}>
            <Input
              error={errorUsername}
              label="Nome:"
              placeholder="Nome Completo"
              onChange={(value: string) => onChangeUsername(value)}
              value={username}
              errorMessage="*O nome precisa ter pelo menos 4 caracteres"
            />
            <MaskedInput
              mask="999.999.999-99"
              error={errorCpf}
              label="CPF:"
              placeholder="000.000.000-00"
              onChange={(value: string) => onChangeCpf(value)}
              value={cpf}
              keyboardType="numeric"
              errorMessage="*Insira um CPF válido"
            />
            <Input
              error={errorEmail}
              label="E-mail:"
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
            <Text style={stylesAdminEditInfo.passwordText}>
              *Caso não queira alterar a senha, mantenha o campo em branco
            </Text>
          </View>
        )}
        {isLoading ? (
          <ActivityIndicator size="large" color="#4F67D8" />
        ) : (
          <View style={stylesAdminEditInfo.buttons}>
            <Button text="SALVAR" onPress={handleSave} />
            <Button isRed={true} text="DELETAR CONTA" onPress={handleAlert} />
          </View>
        )}
      </View>
    </View>
  );
}
