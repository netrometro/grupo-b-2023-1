import { View } from 'react-native';
import stylesAdminEditInfo from './styles';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import PasswordInput from '../../components/PasswordInput';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../services/api';
import { User } from '../../interfaces/user';

export default function AdminEditInfo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [cpf, setCpf] = useState('');
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const admin = async () => {
      const id = await AsyncStorage.getItem('adminId');
      try {
        const response = await api.get(`/admin/${id}`);

        setUser(response.data);
        setUsername(response.data.nome);
        setCpf(response.data.cpf);
        setEmail(response.data.email);
        console.log(email);
        setPassword(response.data.senha);
        console.log(password);
        console.log(response.data.senha);
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

  const data = {
    email: email,
    password: password,
    username: username,
    cpf: cpf,
  };

  const handleSave = () => {
    console.log('salvo com sucesso');
    navigate('dashboard');
  };

  const handleDelete = () => {
    console.log('Deletado com sucesso');
    navigate('login');
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
        </View>
        <View style={stylesAdminEditInfo.buttons}>
          <Button text="SALVAR" onPress={handleSave} />
          <Button isRed={true} text="DELETAR CONTA" onPress={handleDelete} />
        </View>
      </View>
    </View>
  );
}
