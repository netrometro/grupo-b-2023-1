import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import stylesEmployerDashboard from './styles';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../../components/Navbar';
import { ClockClockwise, PencilSimple, UserPlus, XCircle } from 'phosphor-react-native';
import IconButton from '../../components/IconButton';
import { api } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Employer } from '../../interfaces/employer';
import moment from 'moment';

type Nav = {
  navigate: (value: string, id?: object) => void;
};

interface EmployerDashboardProps {
  route: { params: { employeeId: number } };
}

export default function EmployerDashboard({ route }: EmployerDashboardProps) {
  const { employeeId } = route.params;
  const [employerData, setEmployerData] = useState<Employer>();

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
        ToastAndroid.show(
          'Não foi possível carregas as informações deste usuário',
          ToastAndroid.LONG
        );
      }
    };

    getEmployer();
  }, []);

  const { navigate } = useNavigation<Nav>();

  return (
    <View style={stylesEmployerDashboard.container}>
      <Navbar text={'Detalhar Funcionário'} onPressArrowLeft={() => navigate('dashboard')} />
      <View style={stylesEmployerDashboard.body}>
        <View style={stylesEmployerDashboard.companyInfoCard}>
          {employerData ? (
            <View>
              <Text style={stylesEmployerDashboard.employerName}>{employerData.nome}</Text>
              <Text style={stylesEmployerDashboard.employerInfo}>CPF: {employerData.cpf}</Text>
              <Text style={stylesEmployerDashboard.employerInfo}>E-mail: {employerData.email}</Text>
              <Text style={stylesEmployerDashboard.employerInfo}>
                Nascimento: {moment(employerData.nascimento).format('DD/MM/YYYY')}
              </Text>
              <Text style={stylesEmployerDashboard.employerInfo}>
                Nacionalidade: {employerData.nacionalidade}
              </Text>
              <Text style={stylesEmployerDashboard.employerInfo}>RG: {employerData.rg}</Text>
              <Text style={stylesEmployerDashboard.employerInfo}>Cargo: {employerData.cargo}</Text>
              <Text style={stylesEmployerDashboard.employerInfo}>
                Endereço: {employerData.endereco}
              </Text>
              <Text style={stylesEmployerDashboard.employerInfo}>
                PIS/PASEP: {employerData.pispasep}
              </Text>
              <Text style={stylesEmployerDashboard.employerInfo}>
                Admissão: {moment(employerData.admissao).format('DD/MM/YYYY')}
              </Text>
              <Text style={stylesEmployerDashboard.employerInfo}>
                Formação: {employerData.formacao}
              </Text>
              <Text style={stylesEmployerDashboard.employerInfo}>CTPS: {employerData.ctps}</Text>
            </View>
          ) : (
            <Text>Carregando informações do funcionário...</Text>
          )}
          <View style={stylesEmployerDashboard.iconsContainer}>
            <TouchableOpacity onPress={() => navigate('editEmployer', { employeeId: employeeId })}>
              <PencilSimple weight="bold" size={32} color="#4F67D8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <XCircle weight="bold" size={32} color="#D84F4F" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={stylesEmployerDashboard.iconButtonContainer}>
          <IconButton
            onPress={() => navigate('employerOvertimeDashboard', { employeeId: employeeId })}
            text="Horas Extras"
            icon={<ClockClockwise size={38} weight="bold" color="#4F67D8" />}
          />
          <IconButton
            onPress={() => {}}
            text="Faltas"
            icon={<XCircle size={38} weight="bold" color="#4F67D8" />}
          />
        </View>
      </View>
    </View>
  );
}
