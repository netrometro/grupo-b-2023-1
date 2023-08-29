import React, { useState } from 'react';
import { View, ScrollView, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { api } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Nav = {
  navigate: (value: string, id?: object) => void;
};

interface FaltaRegistrationProps {
  route: { params: { employeeId: number } };
}

export default function FaltaRegistration({ route }: FaltaRegistrationProps) {
  const [dataFalta, setDataFalta] = useState('');
  const [tipoFalta, setTipoFalta] = useState('');
  const [descricaoFalta, setDescricaoFalta] = useState('');

  const { navigate } = useNavigation<Nav>();
  const { employeeId } = route.params;

  const handleCreateFalta = async () => {
    const adminId = await AsyncStorage.getItem('adminId');
    try {
      const reqData = {
        dataFalta,
        tipoFalta,
        descricaoFalta,
      };

      await api.post(`/createFalta/${employeeId}`, reqData, {
         headers: {
          Authorization: adminId,
         }, });
      ToastAndroid.show('Falta Adicionada', ToastAndroid.LONG); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Navbar
        onPressArrowLeft={() => {
          navigate('faltaDashboard');
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
