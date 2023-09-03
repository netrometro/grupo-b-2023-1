import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import stylesEmployerDashboard from './styles';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../../components/Navbar';
import {
  ClockClockwise,
  PencilSimple,
  UserPlus,
  XCircle,
  Trash,
  EnvelopeSimple,
} from 'phosphor-react-native';
import IconButton from '../../components/IconButton';
import { api } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Employer } from '../../interfaces/employer';
import moment from 'moment';
import ModalButtons from '../../components/ModalButtons';
import LongInput from '../../components/LongInput';
import { Emp } from '../../interfaces/emp';

type Nav = {
  navigate: (value: string, id?: object) => void;
};

interface EmployerDashboardProps {
  route: { params: { employeeId: number; companyId: number } };
}

export default function EmployerDashboard({ route }: EmployerDashboardProps) {
  const { employeeId, companyId } = route.params;

  const [employerData, setEmployerData] = useState<Employer>();
  const [company, setCompany] = useState<Emp | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

    const getCompany = async () => {
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
        ToastAndroid.show(
          'Não foi possível carregas as informações da empresa deste usuário',
          ToastAndroid.LONG
        );
      }
    };

    getEmployer();
    getCompany();
  }, []);

  const handleEmailIcon = () => {
    Alert.alert(
      'Enviar e-mail',
      `Deseja enviar um e-mail para o funcionário ${employerData?.nome}?`,
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

  const handleSendEmail = async () => {
    setIsLoading(true);
    try {
      await api.post(`/sendEmail`, {
        nome: employerData?.nome,
        message: emailMessage,
        email: employerData?.email,
        empresa: company?.nome,
      });
      setIsLoading(false);
      setModalOpen(false);
      ToastAndroid.show('E-mail enviado com sucesso', ToastAndroid.LONG);
    } catch (error) {
      ToastAndroid.show(
        `Ocorreu um erro ao enviar para o ${employerData?.nome}`,
        ToastAndroid.LONG
      );
      setIsLoading(false);
    }
  };

  const onChangeEmailMessage = (value: string) => {
    setEmailMessage(value);
  };

  const fireEmployes = async () => {
    const adminId = await AsyncStorage.getItem('adminId');

    try {
      await api.put(
        `/demite/${companyId}/${employeeId}`,
        {},
        {
          headers: {
            Authorization: adminId,
          },
        }
      );

      // setEmployerData(response.data);
      ToastAndroid.show('Funcionário Demitido', ToastAndroid.LONG);
    } catch (error) {
      console.log('Erro foi aqui: ' + error);
    }
  };

  const { navigate } = useNavigation<Nav>();

  return (
    <View style={stylesEmployerDashboard.container}>
      <Navbar
        text={'Detalhar Funcionário'}
        onPressArrowLeft={() => navigate('companyDashboard', { companyId: companyId })}
      />
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
            <TouchableOpacity onPress={handleEmailIcon}>
              <EnvelopeSimple weight="bold" size={32} color="#4F67D8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('editEmployer', { employeeId: employeeId })}>
              <PencilSimple weight="bold" size={32} color="#4F67D8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={fireEmployes}>
              <Trash weight="bold" size={32} color="#D84F4F" />
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
            onPress={() => navigate('faltaDashboard', { employeeId: employeeId })}
            text="Faltas"
            icon={<XCircle size={38} weight="bold" color="#4F67D8" />}
          />
        </View>
        <Modal
          visible={modalOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setModalOpen(false)}
        >
          <View style={stylesEmployerDashboard.outerView}>
            {!isLoading ? (
              <View style={stylesEmployerDashboard.modalView}>
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
      </View>
    </View>
  );
}
