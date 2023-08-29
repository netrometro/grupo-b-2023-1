import React, { useState, useEffect } from 'react';
import { View, ScrollView, ToastAndroid } from 'react-native';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { api } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import stylesEditEmployer from './style';

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
            <Input
              error={false}
              label="Nascimento:"
              placeholder="dd/mm/aaaa"
              onChange={(value: string) => setNascimento(value)}
              value={nascimento}
            />
            <Input
              error={false}
              label="Nacionalidade:"
              placeholder="Nacionalidade"
              onChange={(value: string) => setNacionalidade(value)}
              value={nacionalidade}
            />
            <Input
              error={false}
              label="CPF:"
              placeholder="000.000.000-00"
              onChange={(value: string) => setCpf(value)}
              value={cpf}
            />
            <Input
              error={false}
              label="RG:"
              placeholder="0.000.000"
              onChange={(value: string) => setRg(value)}
              value={rg}
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
            <Input
              error={false}
              label="Número do PIS/PASEP:"
              placeholder="0.000.000.000-0"
              onChange={(value: string) => setPispasep(value)}
              value={pispasep}
            />
            <Input
              error={false}
              label="Ano de Admissão:"
              placeholder="dd/mm/aaaa"
              onChange={(value: string) => setAdmissao(value)}
              value={admissao}
            />
            <Input
              error={false}
              label="Formação:"
              placeholder="Insira a formação"
              onChange={(value: string) => setFormacao(value)}
              value={formacao}
            />
            <Input
              error={false}
              label="CTPS:"
              placeholder="0000000/0000"
              onChange={(value: string) => setCtps(value)}
              value={ctps}
            />
          </View>
          <Button text="CADASTRAR FICHA" onPress={handleUpdateEmployee} />
        </View>
      </ScrollView>
    </View>
  );
}
