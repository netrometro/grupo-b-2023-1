import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { api } from '../../services/api';
import { Emp } from '../../interfaces/emp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import stylesDashboardNavbar from '../../components/Navbar/styles'; // Importar o estilo do Navbar
import { useNavigation } from '@react-navigation/native';
import EmployeeList from '../EmployeeList';
import Button from '../../components/Button';

interface CompanyDashboardProps {
  route: { params: { companyId: number } };
}

const CompanyDashboard: React.FC<CompanyDashboardProps> = ({ route }) => {
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

  const { navigate, goBack } = useNavigation();

  const handleRegistrationEmployee = () => {
    navigate('fichaRegistration', {companyId});
  }

  return (
    <View style={styles.container}>
      <View style={stylesDashboardNavbar.container}>
        <View style={stylesDashboardNavbar.contentContainer}>
          <Text style={stylesDashboardNavbar.navbarText}>Detalhes da Empresa</Text>
        </View>
      </View>
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
      <TouchableOpacity style={styles.backButton}
      onPress={() => navigate('dashboard')}
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <Button onPress={handleRegistrationEmployee} text='Adicionar funcionário'/>
      <EmployeeList companyId={companyId}/>
    </View>
  );
};

export default CompanyDashboard;
