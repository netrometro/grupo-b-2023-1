import { ToastAndroid, View, Text, Alert } from 'react-native';
import stylesAdminEditInfo from './styles';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import PasswordInput from '../../components/PasswordInput';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../services/api';
import React from 'react';

export default function AdminEditInfo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [cpf, setCpf] = useState('');
  const [adminId, setAdminId] = useState('');

  useEffect(() => {
    const admin = async () => {
      const id = await AsyncStorage.getItem('adminId');
      if (id !== null) {
        setAdminId(id);
      }
      try {
        const response = await api.get(`/admin/${id}`);

        setUsername(response.data.nome);
        setCpf(response.data.cpf);
        setEmail(response.data.email);
      } catch (error) {
        console.log(error);
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
      if (password === '') {
        await api.put(`/admin/${adminId}`, dataWithoutPassword);
      } else {
        await api.put(`/admin/${adminId}`, dataWithPassword);
      }
      ToastAndroid.show('Dados alterados com sucesso!', ToastAndroid.LONG);
      navigate('dashboard');
    } catch (error) {
      ToastAndroid.show('Ocorreu um erro!', ToastAndroid.LONG);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/${adminId}`);
      await AsyncStorage.removeItem('adminId');
      ToastAndroid.show('Sua conta foi deletada!', ToastAndroid.LONG);
      navigate('login');
    } catch (error) {
      console.log();
      ToastAndroid.show('Ocorreu um erro', ToastAndroid.LONG);
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
          onPress: handleDelete,
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
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
        <View style={stylesAdminEditInfo.inputs}>
          <Input
            error={false}
            label="Nome:"
            placeholder="Nome Completo"
            onChange={(value: string) => setUsername(value)}
            value={username}
          />
          <Input
            error={false}
            label="CPF:"
            placeholder="000.000.000-00"
            onChange={(value: string) => setCpf(value)}
            value={cpf}
          />
          <Input
            error={false}
            label="E-mail:"
            placeholder="email@email.com"
            onChange={(value: string) => setEmail(value)}
            value={email}
          />
          <PasswordInput
            error={false}
            label="Senha:"
            onChange={(value: string) => setPassword(value)}
            placeholder="********"
            value={password}
          />
          <Text style={stylesAdminEditInfo.passwordText}>
            *Caso não queira alterar a senha, mantenha o campo em branco
          </Text>
        </View>
        <View style={stylesAdminEditInfo.buttons}>
          <Button text="SALVAR" onPress={handleSave} />
          <Button isRed={true} text="DELETAR CONTA" onPress={handleAlert} />
        </View>
      </View>
    </View>
  );
}
