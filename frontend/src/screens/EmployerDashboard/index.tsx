import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import stylesEmployerDashboard from './styles';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../../components/Navbar';
import { ClockClockwise, PencilSimple, UserPlus, XCircle } from 'phosphor-react-native';
import IconButton from '../../components/IconButton';

type Nav = {
  navigate: (value: string, id?: object) => void;
};

interface EmployerDashboardProps {
  route: { params: { employeeId: number } };
}

export default function EmployerDashboard({ route }: EmployerDashboardProps) {
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
    <View style={stylesEmployerDashboard.container}>
      <Navbar text={'Detalhar Funcionário'} onPressArrowLeft={() => navigate('dashboard')} />
      <View style={stylesEmployerDashboard.body}>
        <View style={stylesEmployerDashboard.companyInfoCard}>
          {employer ? (
            <View>
              <Text style={stylesEmployerDashboard.employerName}>{employer.nome}</Text>
              <Text style={stylesEmployerDashboard.employerInfo}>CPF: {employer.cpf}</Text>
              <Text style={stylesEmployerDashboard.employerInfo}>E-mail: {employer.email}</Text>
              <Text style={stylesEmployerDashboard.employerInfo}>
                Nascimento: {employer.nascimento}
              </Text>
              <Text style={stylesEmployerDashboard.employerInfo}>
                Nacionalidade: {employer.nacionalidade}
              </Text>
              <Text style={stylesEmployerDashboard.employerInfo}>RG: {employer.rg}</Text>
              <Text style={stylesEmployerDashboard.employerInfo}>Cargo: {employer.cargo}</Text>
              <Text style={stylesEmployerDashboard.employerInfo}>
                Endereço: {employer.endereco}
              </Text>
              <Text style={stylesEmployerDashboard.employerInfo}>
                PIS/PASEP: {employer.pispasep}
              </Text>
              <Text style={stylesEmployerDashboard.employerInfo}>
                Admissão: {employer.admissao}
              </Text>
              <Text style={stylesEmployerDashboard.employerInfo}>
                Formação: {employer.formacao}
              </Text>
              <Text style={stylesEmployerDashboard.employerInfo}>CTPS: {employer.ctps}</Text>
            </View>
          ) : (
            <Text>Carregando informações do funcionário...</Text>
          )}
          <View style={stylesEmployerDashboard.iconsContainer}>
            <TouchableOpacity onPress={() => {}}>
              <PencilSimple weight="bold" size={32} color="#4F67D8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <XCircle weight="bold" size={32} color="#D84F4F" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={stylesEmployerDashboard.iconButtonContainer}>
          <IconButton
            onPress={() => navigate('employerOvertimeDashboard', { employeeId: employer.id })}
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