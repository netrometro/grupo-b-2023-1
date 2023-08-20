import { ToastAndroid, View } from 'react-native';
import stylesAdminRegistration from './styles';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useState } from 'react';
import PasswordInput from '../../components/PasswordInput';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';

export default function AdminRegistration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [cpf, setCpf] = useState('');

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
    try {
      await api.post('/admin', data);
      ToastAndroid.show('Cadastrado com sucesso!', ToastAndroid.LONG);
      navigate('login');
    } catch (error) {
      ToastAndroid.show('Ocorreu um erro!', ToastAndroid.LONG);
    }
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
        </View>
        <Button text="CADASTRAR" onPress={handleSignUp} />
      </View>
    </View>
  );
}
