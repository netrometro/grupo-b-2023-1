import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import stylesCompanyRegistration from './style';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { api, viaCepApi } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CompanyRegistration() {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyCNPJ, setCompanyCNPJ] = useState('');
  const [companyCep, setCompanyCep] = useState('');

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

  const fetchAddresByCep = async (cep: string) => {
    try {
      const response = await viaCepApi.get(`/${cep}/json/`);
      const { logradouro } = response.data;
      setCompanyAddress(logradouro);
    } catch (error) {
      console.error(error);
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
          <Input
            error={false}
            label="Nome da Empresa:"
            placeholder="Nome da Empresa"
            onChange={(value: string) => setCompanyName(value)}
            value={companyName}
          />
          <Input
            error={false}
            label="Endereço da Empresa:"
            placeholder="Endereço da Empresa"
            onChange={(value: string) => setCompanyAddress(value)}
            value={companyAddress}
          />
          <Input
            error={false}
            label="CNPJ da Empresa:"
            placeholder="CNPJ da Empresa"
            onChange={(value: string) => setCompanyCNPJ(value)}
            value={companyCNPJ}
          />
          <Input
            error={false}
            label="CEP da Empresa:"
            placeholder="CEP da Empresa"
            onChange={handleCepChange}
            value={companyCep}
          />
        </View>
        <Button text="CADASTRAR EMPRESA" onPress={handleCreateCompany} />
      </View>
    </View>
  );
}
