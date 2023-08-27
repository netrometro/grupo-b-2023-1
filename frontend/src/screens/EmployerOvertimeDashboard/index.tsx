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
import { Overtime } from '../../interfaces/overtime';
import moment from 'moment';

type Nav = {
  navigate: (value: string, id?: object) => void;
};

interface EmployerOvertimeDashboardProps {
  route: { params: { employeeId: number } };
}

export default function EmployerOvertimeDashboard({ route }: EmployerOvertimeDashboardProps) {
  const { employeeId } = route.params;
  const [employerData, setEmployerData] = useState<Employer>();
  const [overtimesData, setOvertimesData] = useState<Overtime[]>([]);

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

    const getOvertimes = async () => {
      const response = await api.get(`/overtime/${employeeId}`);

      setOvertimesData(response.data);
    };

    getEmployer();
    getOvertimes();
  }, []);

  const { navigate } = useNavigation<Nav>();

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/overtime/${id}`);
      console.log('Apagou!');
    } catch (error) {
      console.log(error);
    }
  };

  const handlePay = async (id: number) => {
    try {
      await api.put(`/pay-overtime/${id}`);
      console.log('Foi pago');
    } catch (error) {
      console.log(error);
    }
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
                Nascimento: {moment(employerData.nascimento).format('DD/MM/YYYY')}
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
          data={overtimesData}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <OvertimeCard
              data={moment(item.data).format('DD/MM/YYYY')}
              horas={item.horas}
              onPressDelete={() => handleDelete(item.id)}
              onPressPay={() => handlePay(item.id)}
              pago={item.pago}
              valorHora={item.valorPorHoras}
            />
          )}
        />
      </View>
    </View>
  );
}
