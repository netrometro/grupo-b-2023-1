import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { api } from '../../services/api';
import { Emp } from '../../interfaces/emp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesEmployerDashboard from './styles';
import { useNavigation } from '@react-navigation/native';
import EmployeeList from '../EmployeeList';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';
import { ClockClockwise, UserPlus } from 'phosphor-react-native';
import IconButton from '../../components/IconButton';

type Nav = {
  navigate: (value: string) => void;
};

export default function EmployerDashboard() {
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
              <UserPlus weight="bold" size={32} color="#4F67D8" />
            </TouchableOpacity>
          </View>
        </View>
        <IconButton
          onPress={() => {}}
          text="Horas Extras"
          icon={<ClockClockwise size={38} weight="bold" color="#4F67D8" />}
        />
      </View>
    </View>
  );
}
