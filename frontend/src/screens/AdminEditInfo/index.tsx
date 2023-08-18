import { View } from 'react-native';
import stylesAdminEditInfo from './styles';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useState } from 'react';

export default function AdminEditInfo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [cpf, setCpf] = useState('');

  const data = {
    email: email,
    password: password,
    username: username,
    cpf: cpf,
  };

  return (
    <View style={stylesAdminEditInfo.container}>
      <Navbar onPressArrowLeft={() => {}} text="Minhas informações" />
      <View style={stylesAdminEditInfo.body}>
        <View style={stylesAdminEditInfo.inputs}>
          <Input
            error={false}
            label="E-mail:"
            placeholder="email@email.com"
            onChange={(value: string) => setEmail(value)}
          />
          <Input
            error={false}
            label="Senha:"
            placeholder="********"
            onChange={(value: string) => setPassword(value)}
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
          <Button
            text="CADASTRAR"
            onPress={() => {
              console.log(data);
            }}
          />
          <Button
            text="DELETAR CONTA"
            onPress={() => {
              console.log(data);
            }}
          />
        </View>
      </View>
    </View>
  );
}
