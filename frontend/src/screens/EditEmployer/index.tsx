import React, { useState, useEffect } from 'react';
import { View, ScrollView, ToastAndroid } from 'react-native';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { api } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import stylesEditEmployer from './style';
import MaskedInput from '../../components/MaskedInput';

interface EditEmployerProps {
  route: { params: { companyId: number; employeeId: number } };
}

interface RouteParams {
  editMode?: boolean;
}

type Nav = {
  navigate: (value: string) => void;
};

export default function EditEmployer({ route }: EditEmployerProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [cargo, setCargo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [pispasep, setPispasep] = useState('');
  const [admissao, setAdmissao] = useState('');
  const [formacao, setFormacao] = useState('');

  const [selectedState, setSelectadeState] = useState('');

  const [ctps, setCtps] = useState('');

  const editMode = (route.params as RouteParams)?.editMode || false;

  const companyId = route.params.companyId;
  const employeeId = route.params.employeeId;

  const { navigate } = useNavigation<Nav>();

  useEffect(() => {
    if (editMode) {
      fetchEmployeeDetails();
    }
  }, [employeeId]);

  const fetchEmployeeDetails = async () => {
    try {
      const adminId = await AsyncStorage.getItem('adminId');

      if (!adminId) {
        console.error('ID inválido');
        return;
      }

      const response = await api.get(`/showFichaDetails/${companyId}/${employeeId}`, {
        headers: {
          Authorization: adminId,
        },
      });

      const employeeDetails = response.data;
      setNome(employeeDetails.nome);
      setEmail(employeeDetails.email);
      setNascimento(employeeDetails.nascimento);
      setNacionalidade(employeeDetails.nacionalidade);
      setCpf(employeeDetails.cpf);
      setRg(employeeDetails.rg);
      setCargo(employeeDetails.cargo);
      setEndereco(employeeDetails.endereco);
      setPispasep(employeeDetails.pis_pasep);
      setAdmissao(employeeDetails.admissao);
      setFormacao(employeeDetails.formacao);
      setCtps(employeeDetails.ctps);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateEmployee = async () => {
    try {
      const adminId = await AsyncStorage.getItem('adminId');

      if (!adminId) {
        console.error('ID inválido');
        return;
      }

      const reqData = {
        nome: nome,
        email: email,
        nascimento: nascimento,
        nacionalidade: nacionalidade,
        cpf: cpf,
        rg: rg,
        cargo: cargo,
        endereco: endereco,
        pispasep: pispasep,
        admissao: admissao,
        formacao: formacao,
        ctps: ctps,
        demitido: false,
      };

      const headers = {
        Authorization: adminId,
      };

      console.log('id', employeeId);

      await api.put(`/updateFicha/${companyId}/${employeeId}`, reqData, { headers });
      ToastAndroid.show('Ficha Atualizada', ToastAndroid.LONG);
    } catch (error) {
      console.error(error);
    }
  };

  const getRgMask = (state: string) => {
    switch (state) {
      case 'AC':
      case 'AM':
      case 'DF':
      case 'ES':
      case 'GO':
      case 'MS':
      case 'MT':
      case 'PA':
      case 'PB':
      case 'RO':
      case 'RR':
      case 'SE':
      case 'TO':
        return '99.999.999-9';
      case 'AL':
      case 'BA':
      case 'MA':
      case 'PE':
      case 'PI':
        return '9999999-9';
      case 'AP':
      case 'CE':
      case 'MG':
      case 'PR':
        return '99999999-9';
      case 'RS':
        return '9999999999';
      case 'RJ':
        return '99.999.99-9';
      case 'RN':
        return '99.99.999-9';
      case 'SP':
        return '99.999.999-9';
      default:
        return '99.999.999-9';
    }
  };

  const handleStateSelection = (stateAbbreviation: string) => {
    setSelectadeState(stateAbbreviation.toUpperCase());
  };

  return (
    <View style={stylesEditEmployer.container}>
      <Navbar
        onPressArrowLeft={() => {
          navigate('dashboard');
        }}
        text="Insira os dados de Cadastro do Funcionário"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={stylesEditEmployer.body}>
          <View style={stylesEditEmployer.inputs}>
          <Input
              error={false}
              label="Nome:"
              placeholder="Nome Completo"
              onChange={(value: string) => setNome(value)}
              value={nome}
            />
            <Input
              error={false}
              label="E-mail:"
              placeholder="email@email.com"
              onChange={(value: string) => setEmail(value)}
              value={email}
            />
            <MaskedInput
              error={false}
              label="Nascimento:"
              mask="99/99/9999"
              placeholder="dd/mm/aaaa"
              onChange={(value: string) => setNascimento(value)}
              value={nascimento}
              keyboardType="numeric"
            />
            <Input
              error={false}
              label="Nacionalidade:"
              placeholder="Nacionalidade"
              onChange={(value: string) => setNacionalidade(value)}
              value={nacionalidade}
            />
          <MaskedInput
              label="CPF:"
              mask="999.999.999-99"
              placeholder="000.000.000-00"
              onChange={(value: string) => setCpf(value)}
              value={cpf}
              keyboardType="numeric" 
              error={false}              
              />
            <Input 
              error={false}
              placeholder={'Abreviação do Estado'} 
              label={'Adicione a Abreviação do seu Estado'} 
              onChange={(value: string) => handleStateSelection(value)}
              value={selectedState}            
            />
            <MaskedInput
              error={false}
              mask={getRgMask(selectedState)}
              label="RG:"
              placeholder="0.000.000"
              onChange={(value: string) => setRg(value)}
              value={rg}
              keyboardType="numeric" 
            />
            <Input
              error={false}
              label="Cargo:"
              placeholder="Cargo exercido"
              onChange={(value: string) => setCargo(value)}
              value={cargo}
            />
            <Input
              error={false}
              label="Endereço:"
              placeholder="Insira o endereço completo"
              onChange={(value: string) => setEndereco(value)}
              value={endereco}
            />
            <MaskedInput
              error={false}
              mask='9.999.999.999-9'
              label="Número do PIS/PASEP:"
              placeholder="0.000.000.000-0"
              onChange={(value: string) => setPispasep(value)}
              value={pispasep}
              keyboardType="numeric" 
            />
            <MaskedInput
              error={false}
              mask='99/99/9999'
              label="Ano de Admissão:"
              placeholder="dd/mm/aaaa"
              onChange={(value: string) => setAdmissao(value)}
              value={admissao}
              keyboardType="numeric" 
            />
            <Input
              error={false}
              label="Formação:"
              placeholder="Insira a formação"
              onChange={(value: string) => setFormacao(value)}
              value={formacao}
            />
            <MaskedInput
              error={false}
              mask='9999999/9999'
              label="CTPS:"
              placeholder="0000000/0000"
              onChange={(value: string) => setCtps(value)}
              value={ctps}
              keyboardType="numeric" 
            />
          </View>
          <Button text="EDITAR FICHA" onPress={handleUpdateEmployee} />
        </View>
      </ScrollView>
    </View>
  );
}
