import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import stylesOvertimeEmployerDashboard from './styles';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../../components/Navbar';
import { Plus } from 'phosphor-react-native';
import OvertimeCard from './components/OvertimeCard';
import { Employer } from '../../interfaces/employer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../services/api';

type Nav = {
  navigate: (value: string, id?: object) => void;
};

interface EmployerOvertimeDashboardProps {
  route: { params: { employeeId: number } };
}

export default function EmployerOvertimeDashboard({ route }: EmployerOvertimeDashboardProps) {
  const { employeeId } = route.params;
  const [employerData, setEmployerData] = useState<Employer>();

  useEffect(() => {
    const getEmployer = async () => {
      const adminId = await AsyncStorage.getItem('adminId');
      const response = await api.get(`/ficha/${employeeId}`, {
        headers: {
          Authorization: adminId,
        },
      });

      setEmployerData(response.data);
    };

    getEmployer();
  }, []);

  const horasExtras = [
    {
      id: 1,
      data: '10/07/2023',
      pago: true,
      valorHora: 50,
      horas: 5,
    },
    {
      id: 2,
      data: '11/07/2023',
      pago: true,
      valorHora: 53,
      horas: 2,
    },
    {
      id: 3,
      data: '15/07/2023',
      pago: false,
      valorHora: 73,
      horas: 8,
    },
    {
      id: 4,
      data: '15/07/2023',
      pago: false,
      valorHora: 73,
      horas: 8,
    },
  ];

  const { navigate } = useNavigation<Nav>();

  const handleDelete = (id: number) => {
    console.log('Deletado ' + id);
  };

  const handlePay = (id: number) => {
    console.log('Pago ' + id);
  };

  return (
    <View style={stylesOvertimeEmployerDashboard.container}>
      <Navbar text={'Horas Extras'} onPressArrowLeft={() => navigate('dashboard')} />
      <View style={stylesOvertimeEmployerDashboard.body}>
        <View style={stylesOvertimeEmployerDashboard.employerInfoCard}>
          {employerData ? (
            <View>
              <Text style={stylesOvertimeEmployerDashboard.employerName}>{employerData.nome}</Text>
              <Text style={stylesOvertimeEmployerDashboard.employerInfo}>
                CPF: {employerData.cpf}
              </Text>
              <Text style={stylesOvertimeEmployerDashboard.employerInfo}>
                E-mail: {employerData.email}
              </Text>
              <Text style={stylesOvertimeEmployerDashboard.employerInfo}>
                Nascimento: {employerData.nascimento}
              </Text>
            </View>
          ) : (
            <Text>Carregando informações do funcionário...</Text>
          )}
          <View style={stylesOvertimeEmployerDashboard.iconsContainer}>
            <TouchableOpacity onPress={() => navigate('addOvertime', { employeeId: employeeId })}>
              <Plus weight="bold" size={32} color="#4F67D8" />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          style={stylesOvertimeEmployerDashboard.flatList}
          data={horasExtras}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <OvertimeCard
              data={item.data}
              horas={item.horas}
              onPressDelete={() => handleDelete(item.id)}
              onPressPay={() => handlePay(item.id)}
              pago={item.pago}
              valorHora={item.valorHora}
            />
          )}
        />
      </View>
    </View>
  );
}
