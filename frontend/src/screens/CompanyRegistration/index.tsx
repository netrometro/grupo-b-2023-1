import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import stylesCompanyRegistration from './style';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { api, viaCepApi } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MaskedInput from '../../components/MaskedInput';

export default function CompanyRegistration() {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyCNPJ, setCompanyCNPJ] = useState('');
  const [companyCep, setCompanyCep] = useState('');
  const [cnpjExist, setCnpjExist] = useState(false);

  type Nav = {
    navigate: (value: string) => void;
  };

  const { navigate } = useNavigation<Nav>();

  const data = {
    nome: companyName,
    cnpj: companyAddress,
    endereco: companyCNPJ,
    cep: companyCep,
  };

  const verifyCNPJ = async () => {
    try {
      const response = await api.get(`https://receitaws.com.br/v1/cnpj/${companyCNPJ}`);
      if (response.data.situacao === 'ATIVA') {
        setCnpjExist(true);
        ToastAndroid.show('cnpj existe e está ativo', ToastAndroid.LONG);
      } else {
        setCnpjExist(false);
        ToastAndroid.show('cnpj não existe ou não está ativo', ToastAndroid.LONG);
      }
    } catch(error) {
      console.error(error);
      ToastAndroid.show('Erro ao verificar cnpj', ToastAndroid.LONG);
    }
  };

  const fetchAddresByCep = async (cep: string) => {
    try {
      const response = await viaCepApi.get(`/${cep}/json/`);
      const { logradouro } = response.data;
      setCompanyAddress(logradouro);
    } catch (error) {
    }
  }

  const handleCreateCompany = async () => {
    try {
      const adminId = await AsyncStorage.getItem('adminId');

      console.log('admindId:', adminId);

      if (!adminId) {
        console.error('id invalido');
        return;
      }

      const requestData = {
        ...data,
        adminId: parseInt(adminId),
      };

      const headers = {
        Authorization: adminId,
      };

      await api.post('/createEmp', requestData, { headers });
      ToastAndroid.show('Empresa Adicionada', ToastAndroid.LONG);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCepChange = (value: string) => {
    setCompanyCep(value);
    fetchAddresByCep(value);
  }

  return (
    <View style={stylesCompanyRegistration.container}>
        <Navbar
          onPressArrowLeft={() => {
            navigate('dashboard');
          }}
          text="Cadastrar Empresa"
        />
        <View style={stylesCompanyRegistration.body}>
        <View style={stylesCompanyRegistration.inputs}>
    <MaskedInput
      error={false}
      label="Nome da Empresa:"
      placeholder="Nome da Empresa"
      onChange={(value: string) => setCompanyName(value)}
      value={companyName}
    />
    <MaskedInput
      error={false}
      label="Endereço da Empresa:"
      placeholder="Logradouro"
      onChange={(value: string) => setCompanyAddress(value)}
      value={companyAddress}
    />
    <MaskedInput
      error={false}
      label="CNPJ da Empresa:"
      placeholder="00.000.000/0000-00"
      mask="99.999.999/9999-99" 
      onChange={(value: string) => {
        setCompanyCNPJ(value);
      }}
      value={companyCNPJ}
    />
    <MaskedInput
      error={false}
      label="CEP da Empresa:"
      placeholder="00000-000"
      mask="99999-999"
      onChange={handleCepChange}
      value={companyCep}
    />
  </View>

        <Button text="VERIFICAR CNPJ" onPress={verifyCNPJ} />
        <Button text="CADASTRAR EMPRESA" onPress={handleCreateCompany} />
      </View>
    </View>
  );
}
