import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
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
import Input from '../../components/Input';
import LongInput from './components/LongInput';
import ModalButtons from '../../components/ModalButtons';
import { Employer } from '../../interfaces/employer';

interface CompanyDashboardProps {
  route: { params: { companyId: number } };
}

type Nav = {
  navigate: (value: string, ids?: object) => void;
};

export default function CompanyDashboard({ route }: CompanyDashboardProps) {
  const { companyId } = route.params;
  const [company, setCompany] = useState<Emp | null>(null);
  const [emailMessage, setEmailMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [employees, setEmployees] = useState<Employer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

    const fetchEmployees = async () => {
      try {
        const adminId = await AsyncStorage.getItem('adminId');

        if (!adminId) {
          console.error('ID de administrador inválido');
          return;
        }

        const response = await api.get(`/showFicha/${companyId}`, {
          headers: {
            Authorization: adminId,
          },
        });

        setEmployees(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompany();
    fetchEmployees();
  }, [companyId]);

  const { navigate } = useNavigation<Nav>();

  const handleRegistrationEmployee = () => {
    navigate('fichaRegistration', { companyId });
  };

  const onChangeEmailMessage = (value: string) => {
    setEmailMessage(value);
  };

  const handleSendEmail = async () => {
    setIsLoading(true);
    for (let index = 0; index < employees.length; index++) {
      try {
        await api.post(`/sendEmail`, {
          nome: employees[index].nome,
          message: emailMessage,
          email: employees[index].email,
          empresa: company?.nome,
        });
      } catch (error) {
        ToastAndroid.show(
          `Ocorreu um erro ao enviar para o ${employees[index].email}`,
          ToastAndroid.LONG
        );
      }
    }
    setIsLoading(false);
    setModalOpen(false);
    ToastAndroid.show(`Processo finalizado com sucesso`, ToastAndroid.LONG);
  };

  const handleEmailIcon = () => {
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
          onPress: () => {
            setModalOpen(true);
          },
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
            <TouchableOpacity onPress={handleEmailIcon}>
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
        <Modal
          visible={modalOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setModalOpen(false)}
        >
          <View style={styles.outerView}>
            {!isLoading ? (
              <View style={styles.modalView}>
                <LongInput
                  error={false}
                  label="Digite a mensagem do e-mail:"
                  onChange={(value) => onChangeEmailMessage(value)}
                  placeholder="Mensagem"
                  value={emailMessage}
                />
                <ModalButtons
                  blueText="Enviar"
                  redText="Cancelar"
                  onPressBlueButton={handleSendEmail}
                  onPressRedButton={() => setModalOpen(false)}
                />
              </View>
            ) : (
              <ActivityIndicator animating size={'large'} color={'#4F67D8'} />
            )}
          </View>
        </Modal>
        <EmployeeList companyId={companyId} />
      </View>
    </View>
  );
}
