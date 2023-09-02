import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { api } from '../../services/api';
import { Emp } from '../../interfaces/emp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import stylesDashboardNavbar from '../../components/Navbar/styles'; // Importar o estilo do Navbar
import { useNavigation } from '@react-navigation/native';
import EmployeeList from '../EmployeeList';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';
import { EnvelopeSimple, UserPlus } from 'phosphor-react-native';

interface CompanyDashboardProps {
  route: { params: { companyId: number } };
}

type Nav = {
  navigate: (value: string, ids?: object) => void;
};

export default function CompanyDashboard({ route }: CompanyDashboardProps) {
  const { companyId } = route.params;
  const [company, setCompany] = useState<Emp | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const adminId = await AsyncStorage.getItem('adminId');

        if (!adminId) {
          console.error('ID de administrador inválido');
          return;
        }

        const response = await api.get(`/singleEmp/${companyId}`, {
          headers: {
            Authorization: adminId,
          },
        });

        setCompany(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompany();
  }, [companyId]);

  const { navigate } = useNavigation<Nav>();

  const handleRegistrationEmployee = () => {
    navigate('fichaRegistration', { companyId });
  };

  const handleSendEmail = () => {
    Alert.alert(
      'Enviar e-mail',
      `Deseja enviar um e-mail para todos os funcionários da empresa ${company?.nome}?`,
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {},
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };

  const handleDemisionList = () => {
    navigate('demisionList', { companyId });
  };

  return (
    <View style={styles.container}>
      <Navbar text={`Empresa ${company?.nome}`} onPressArrowLeft={() => navigate('dashboard')} />
      <View style={styles.body}>
        <View style={styles.companyInfoCard}>
          {company ? (
            <View>
              <Text style={styles.companyName}>{company.nome}</Text>
              <Text style={styles.companyInfo}>CNPJ: {company.cnpj}</Text>
              <Text style={styles.companyInfo}>Endereço: {company.endereco}</Text>
              <Text style={styles.companyInfo}>CEP: {company.cep}</Text>
            </View>
          ) : (
            <Text>Carregando informações da empresa...</Text>
          )}
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={handleSendEmail}>
              <EnvelopeSimple weight="bold" size={32} color="#4F67D8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRegistrationEmployee}>
              <UserPlus weight="bold" size={32} color="#4F67D8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDemisionList}>
              <UserPlus weight="bold" size={32} color="#FF0000" />
            </TouchableOpacity>
          </View>
        </View>
        <EmployeeList companyId={companyId} />
      </View>
    </View>
  );
}
