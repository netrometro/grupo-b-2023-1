import React, { useState } from 'react';
import { View, ScrollView, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { api } from '../../services/api';

interface FaltaRegistrationProps {
  route: { params: { employeeId: number } };
}

export default function FaltaRegistration({ route }: FaltaRegistrationProps) {
  const [dataFalta, setDataFalta] = useState('');
  const [tipoFalta, setTipoFalta] = useState('');
  const [descricaoFalta, setDescricaoFalta] = useState('');

  const { navigate } = useNavigation();
  const { employeeId } = route.params;

  const handleCreateFalta = async () => {
    try {
      const reqData = {
        dataFalta,
        tipoFalta,
        descricaoFalta,
      };

      await api.post(`/createFalta/${employeeId}`, reqData, { Headers });
      ToastAndroid.show('Falta Adicionada', ToastAndroid.LONG); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Navbar
        onPressArrowLeft={() => {
          navigate('EmployeeList');
        }}
        text="Insira os dados da Falta do Funcionário"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          error={false}
          label="Data da Falta:"
          placeholder="dd/mm/aaaa"
          onChange={(value: string) => setDataFalta(value)}
          value={dataFalta}
        />
        <Input
          error={false}
          label="Tipo da Falta:"
          placeholder="Tipo da Falta"
          onChange={(value: string) => setTipoFalta(value)}
          value={tipoFalta}
        />
        <Input
          error={false}
          label="Descrição da Falta:"
          placeholder="Descrição da Falta"
          onChange={(value: string) => setDescricaoFalta(value)}
          value={descricaoFalta}
        />
        <Button text="CADASTRAR FALTA" onPress={handleCreateFalta} />
      </ScrollView>
    </View>
  );
}
