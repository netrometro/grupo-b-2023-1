import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import stylesAddOvertime from './styles';
import Navbar from '../../components/Navbar';

type Nav = {
  navigate: (value: string) => void;
};

interface AddOvertimeProps {
  route: { params: { employeeId: number } };
}

export default function AddOvertime({ route }: AddOvertimeProps) {
  const { employeeId } = route.params;

  const { navigate } = useNavigation<Nav>();

  const handleAddOvertime = async () => {
    console.log('Adicionando');
  };

  return (
    <View style={stylesAddOvertime.container}>
      <Navbar text={'Adicionar Hora Extra'} onPressArrowLeft={() => navigate('dashboard')} />
    </View>
  );
}
