import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
  Alert,
} from 'react-native';
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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPay, setIsLoadingPay] = useState(false);

  const getOvertimes = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/overtime/${employeeId}`);

      setOvertimesData(response.data);
      setIsLoading(false);
    } catch (error) {
      ToastAndroid.show('Ocorreu um erro ao carregar as horas extras', ToastAndroid.LONG);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getEmployer = async () => {
      const adminId = await AsyncStorage.getItem('adminId');
      try {
        const response = await api.get(`/ficha/${employeeId}`, {
          headers: {
            Authorization: adminId,
          },
        });

        setEmployerData(response.data);
      } catch (error) {
        ToastAndroid.show('Ocorreu um erro ao carregar o usuário', ToastAndroid.LONG);
      }
    };

    getEmployer();
    getOvertimes();
  }, [employeeId]);

  const { navigate } = useNavigation<Nav>();

  const handleDelete = async (id: number) => {
    Alert.alert(
      'Deletar hora extra?',
      'Confirme se deseja deletar esta hora extra, a ação será irreversível',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              await api.delete(`/overtime/${id}`);
              ToastAndroid.show('Deletado com sucesso', ToastAndroid.LONG);

              getOvertimes();
            } catch (error) {
              ToastAndroid.show('Ocorreu um erro ao deletar', ToastAndroid.LONG);
            }
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };

  const handlePay = async (id: number) => {
    try {
      setIsLoadingPay(true);
      await api.put(`/pay-overtime/${id}`);
      ToastAndroid.show('Pagamento realizado', ToastAndroid.LONG);
      setIsLoadingPay(false);
      getOvertimes();
    } catch (error) {
      ToastAndroid.show('Ocorreu um erro ao registrar o pagamento', ToastAndroid.LONG);
      setIsLoading(false);
    }
  };

  return (
    <View style={stylesOvertimeEmployerDashboard.container}>
      <Navbar
        text={'Horas Extras'}
        onPressArrowLeft={() => navigate('employerDashboard', { employeeId: employeeId })}
      />
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
        {isLoading ? (
          <ActivityIndicator size="large" color="#4F67D8" />
        ) : (
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
                isLoading={isLoadingPay}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}
