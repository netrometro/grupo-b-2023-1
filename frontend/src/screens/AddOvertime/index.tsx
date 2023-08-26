import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import stylesAddOvertime from './styles';
import Navbar from '../../components/Navbar';
import MaskedInput from '../../components/MaskedInput';
import Input from '../../components/Input';
import Button from '../../components/Button';

type Nav = {
  navigate: (value: string) => void;
};

interface AddOvertimeProps {
  route: { params: { employeeId: number } };
}

export default function AddOvertime({ route }: AddOvertimeProps) {
  const { employeeId } = route.params;

  const [date, setDate] = useState('');
  const [hourValue, setHourValue] = useState('');
  const [hours, setHours] = useState('');

  const { navigate } = useNavigation<Nav>();

  const data = {
    data: date,
    valorHora: hourValue,
    horas: hours,
  };

  const handleAddOvertime = async () => {
    console.log(data);
  };

  const onChangeDate = (value: string) => {
    setDate(value);
  };

  const onChangeHours = (value: string) => {
    setHours(value);
  };

  const onChangeHourValue = (value: string) => {
    setHourValue(value);
  };

  return (
    <View style={stylesAddOvertime.container}>
      <Navbar text={'Adicionar Hora Extra'} onPressArrowLeft={() => navigate('dashboard')} />
      <View style={stylesAddOvertime.body}>
        <View style={stylesAddOvertime.inputs}>
          <MaskedInput
            error={false}
            label="Data"
            onChange={(value) => onChangeDate(value)}
            placeholder="00/00/0000"
            value={date}
            mask="99/99/9999"
            keyboardType="numeric"
          />
          <Input
            error={false}
            label="Valor por hora:"
            onChange={(value) => onChangeHourValue(value)}
            placeholder="R$0,00"
            value={hourValue}
            keyboardType="numeric"
          />
          <Input
            error={false}
            label="Horas"
            onChange={(value) => onChangeHours(value)}
            placeholder="Horas:"
            value={hours}
            keyboardType="numeric"
          />
        </View>
        <Button onPress={handleAddOvertime} text="Salvar" />
      </View>
    </View>
  );
}
