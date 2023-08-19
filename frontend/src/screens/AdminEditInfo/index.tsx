import { View } from 'react-native';
import stylesAdminEditInfo from './styles';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useState } from 'react';
import PasswordInput from '../../components/PasswordInput';
import { useNavigation } from '@react-navigation/native';

export default function AdminEditInfo() {
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
            label="E-mail:"
            placeholder="email@email.com"
            onChange={(value: string) => setEmail(value)}
          />
          <PasswordInput
            error={false}
            label="Senha:"
            onChange={(value: string) => setPassword(value)}
            placeholder="********"
          />
          <Input
            error={false}
            label="Nome:"
            placeholder="Nome Completo"
            onChange={(value: string) => setUsername(value)}
          />
          <Input
            error={false}
            label="CPF:"
            placeholder="000.000.000-00"
            onChange={(value: string) => setCpf(value)}
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
