import React, { useState } from 'react';
import { View, ScrollView, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { api } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaskedInput from '../../components/MaskedInput';
import { CheckBox } from 'react-native-elements';

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
  const [faltaJustificada, setFaltaJustificada] = useState(false);

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
        },
      });
      ToastAndroid.show('Falta Adicionada', ToastAndroid.LONG);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Navbar
        onPressArrowLeft={() => {
          navigate('faltaDashboard', { employeeId: employeeId });
        }}
        text="Insira os dados da Falta do Funcionário"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <MaskedInput
          error={false}
          label="Data da Falta:"
          placeholder="DD/MM/AAAA"
          onChange={(value: string) => setDataFalta(value)}
          value={dataFalta}
          mask="99/99/9999"
          keyboardType='numeric'
        />
        <CheckBox
          title="Falta"
          checked={!faltaJustificada}
          onPress={() => {
            setFaltaJustificada(false);
            setTipoFalta('Falta');
          }}
        />
        <CheckBox
          title="Falta Justificada"
          checked={faltaJustificada}
          onPress={() => {
            setFaltaJustificada(true);
            setTipoFalta('Falta Justificada');
          }}
        />
        {faltaJustificada ? ( // Renderiza a descrição apenas se faltaJustificada for true
          <Input
            error={false}
            label="Descrição da Falta:"
            placeholder="Descrição da Falta"
            onChange={(value: string) => setDescricaoFalta(value)}
            value={descricaoFalta}
          />
        ) : (
          <Input
            error={false}
            label="Descrição da Falta:"
            value="N/D" // Define o valor padrão "N/D" quando faltaJustificada for false
            editable={false} // Impede a edição quando faltaJustificada for false
          />
        )}
  
        <Button text="CADASTRAR FALTA" onPress={handleCreateFalta} />
      </ScrollView>
    </View>
  );
}
