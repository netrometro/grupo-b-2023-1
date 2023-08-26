import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import stylesOvertimeEmployerDashboard from './styles';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../../components/Navbar';
import { Plus } from 'phosphor-react-native';
import OvertimeCard from './components/OvertimeCard';

type Nav = {
  navigate: (value: string) => void;
};

interface EmployerOvertimeDashboardProps {
  route: { params: { employeeId: number } };
}

export default function EmployerOvertimeDashboard({ route }: EmployerOvertimeDashboardProps) {
  const { employeeId } = route.params;

  const employer = {
    id: 1,
    nome: 'Nome completo',
    email: 'email@email.com',
    nascimento: '07/05/2002',
    nacionalidade: 'Brasileiro',
    cpf: '000.000.000-00',
    rg: '00.000.000-0',
    cargo: 'Gerente de vendas',
    endereco: 'Av. Pedro Jorge, 142',
    pispasep: '000.00000.00-0',
    admissao: '09/10/2016',
    formacao: 'Superior completo',
    ctps: '00000000',
  };

  useEffect(() => {}, []);

  const { navigate } = useNavigation<Nav>();

  return (
    <View style={stylesOvertimeEmployerDashboard.container}>
      <Navbar text={'Horas Extras'} onPressArrowLeft={() => navigate('dashboard')} />
      <View style={stylesOvertimeEmployerDashboard.body}>
        <View style={stylesOvertimeEmployerDashboard.employerInfoCard}>
          {employer ? (
            <View>
              <Text style={stylesOvertimeEmployerDashboard.employerName}>{employer.nome}</Text>
              <Text style={stylesOvertimeEmployerDashboard.employerInfo}>CPF: {employer.cpf}</Text>
              <Text style={stylesOvertimeEmployerDashboard.employerInfo}>
                E-mail: {employer.email}
              </Text>
              <Text style={stylesOvertimeEmployerDashboard.employerInfo}>
                Nascimento: {employer.nascimento}
              </Text>
            </View>
          ) : (
            <Text>Carregando informações do funcionário...</Text>
          )}
          <View style={stylesOvertimeEmployerDashboard.iconsContainer}>
            <TouchableOpacity onPress={() => {}}>
              <Plus weight="bold" size={32} color="#4F67D8" />
            </TouchableOpacity>
          </View>
        </View>
        <OvertimeCard
          data="10/07/2022"
          horas={5}
          onPressDelete={() => {}}
          onPressPay={() => {}}
          pago={true}
          valorHora={132}
        />
        <OvertimeCard
          data="10/07/2022"
          horas={5}
          onPressDelete={() => {}}
          onPressPay={() => {}}
          pago={false}
          valorHora={132}
        />
      </View>
    </View>
  );
}
