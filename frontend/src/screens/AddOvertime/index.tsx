import { ActivityIndicator, ToastAndroid, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import stylesAddOvertime from './styles';
import Navbar from '../../components/Navbar';
import MaskedInput from '../../components/MaskedInput';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { api } from '../../services/api';

type Nav = {
  navigate: (value: string, id?: object) => void;
};

interface AddOvertimeProps {
  route: { params: { employeeId: number } };
}

export default function AddOvertime({ route }: AddOvertimeProps) {
  const { employeeId } = route.params;

  const [date, setDate] = useState('');
  const [errorDate, setErrorDate] = useState(true);
  const [hourValue, setHourValue] = useState('');
  const [errorHourValue, setErrorHourValue] = useState(true);
  const [hours, setHours] = useState('');
  const [errorHours, setErrorHours] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { navigate } = useNavigation<Nav>();

  const convertDate = (date: string) => {
    const baseDate = new Date(date.split('/').reverse().join('-'));
    baseDate.setHours(baseDate.getHours() + 4);

    return baseDate;
  };

  const data = {
    data: convertDate(date),
    valorPorHoras: parseFloat(hourValue),
    horas: parseFloat(hours),
  };

  const handleAddOvertime = async () => {
    if (!errorDate && !errorHourValue && !errorHours && true) {
      try {
        setIsLoading(true);
        await api.post(`/overtime/${employeeId}`, data);
        setIsLoading(false);
        ToastAndroid.show('Adicionado com sucesso', ToastAndroid.LONG);
        navigate('employerDashboard', { employeeId: employeeId });
      } catch (error) {
        ToastAndroid.show('Erro! Verifique os campos e tente novamente', ToastAndroid.LONG);
        setIsLoading(false);
      }
    } else {
      ToastAndroid.show('Os campos possuem erros', ToastAndroid.LONG);
    }
  };

  const onChangeDate = (value: string) => {
    setDate(value);
    setErrorDate(value.length != 10);
  };

  const onChangeHours = (value: string) => {
    setHours(value);
    setErrorHours(parseFloat(value) <= 0 || value == '');
  };

  const onChangeHourValue = (value: string) => {
    setHourValue(value);
    setErrorHourValue(parseFloat(value) <= 0 || value == '');
  };

  return (
    <View style={stylesAddOvertime.container}>
      <Navbar
        text={'Adicionar Hora Extra'}
        onPressArrowLeft={() => navigate('employerOvertimeDashboard', { employeeId: employeeId })}
      />
      <View style={stylesAddOvertime.body}>
        <View style={stylesAddOvertime.inputs}>
          <MaskedInput
            error={errorDate}
            errorMessage="*Insira uma data válida"
            label="Data"
            onChange={(value) => onChangeDate(value)}
            placeholder="00/00/0000"
            value={date}
            mask="99/99/9999"
            keyboardType="numeric"
          />
          <Input
            error={errorHourValue}
            errorMessage="*O valor precisa ser maior que 0"
            label="Valor por hora:"
            onChange={(value) => onChangeHourValue(value)}
            placeholder="R$0,00"
            value={hourValue}
            keyboardType="numeric"
          />
          <Input
            error={errorHours}
            errorMessage="*O valor precisa ser maior que 0"
            label="Horas"
            onChange={(value) => onChangeHours(value)}
            placeholder="Horas:"
            value={hours}
            keyboardType="numeric"
          />
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#4F67D8" />
        ) : (
          <Button onPress={handleAddOvertime} text="Salvar" />
        )}
      </View>
    </View>
  );
}
