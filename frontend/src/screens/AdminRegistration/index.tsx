import { View } from 'react-native';
import stylesAdminRegistration from './styles';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useState } from 'react';
import PasswordInput from '../../components/PasswordInput';
import { useNavigation } from '@react-navigation/native';

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
    password: password,
    username: username,
    cpf: cpf,
  };

  const handleSignUp = () => {
    console.log(data);
    navigate('login');
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
        <Button text="CADASTRAR" onPress={handleSignUp} />
      </View>
    </View>
  );
}
