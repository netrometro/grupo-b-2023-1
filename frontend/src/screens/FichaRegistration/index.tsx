import stylesFichaRegistration from "./styles";
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ToastAndroid, View } from "react-native";
import Navbar from "../../components/Navbar";
import Input from "../../components/Input";
import Button from "../../components/Button";
import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from "../../services/api";


export default function FichaRegistration(){
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

    type Nav = {
        navigate: (value: string) => void;
      };
    
      const { navigate } = useNavigation<Nav>();

      const data = {
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
      };
      
      const handleCreateEmployee = async () => {
        try {
          const adminId = await AsyncStorage.getItem('adminId');

          if(!adminId){
            console.error('ID inválido');
            return;
           } 

          const reqData = {
            ...data,
            adminId: parseInt(adminId),
          }

          const headers = {
            Authorization: adminId,
          }

          await api.post("/createFicha/:empresaId", reqData, {headers});
          ToastAndroid.show('Ficha Adicionada', ToastAndroid.LONG);
        } catch (error){
          console.error(error)
        }
      };

      const handleRegister = () => {
        console.log(data);
        navigate('dashboard')
      };

      return (
        <View style={stylesFichaRegistration.container}>
            <Navbar onPressArrowLeft={() => {
                navigate('dashboard');
              }}
              text="Insira os dados de Cadastro do Funcionário"
              />
              <View style={stylesFichaRegistration.body}>
                <View style={stylesFichaRegistration.inputs}>
                    <Input error={false} label="Nome:" placeholder="Nome Completo" onChange={(value: string) => setNome(value)} value={nome}/>
                    <Input error={false} label="E-mail:" placeholder="email@email.com" onChange={(value: string) => setEmail(value)} value={email}/>
                    <Input error={false} label="Nascimento:" placeholder="dd/mm/aaaa" onChange={(value: string) => setNascimento(value)} value={nascimento}/>
                    <Input error={false} label="Nacionalidade:" placeholder="Nacionalidade" onChange={(value: string) => setNacionalidade(value)} value={nacionalidade}/>
                    <Input error={false} label="CPF:" placeholder="000.000.000-00" onChange={(value: string) => setCpf(value)} value={cpf}/>
                    <Input error={false} label="RG:" placeholder="0.000.000" onChange={(value: string) => setRg(value)} value={rg}/>
                    <Input error={false} label="Cargo:" placeholder="Cargo exercido" onChange={(value: string) => setCargo(value)} value={cargo}/>
                    <Input error={false} label="Endereço:" placeholder="Insira o endereço completo" onChange={(value: string) => setEndereco(value)} value={endereco}/>
                    <Input error={false} label="Número do PIS/PASEP:" placeholder="0.000.000.000-0" onChange={(value: string) => setPispasep(value)} value={pispasep}/>
                    <Input error={false} label="Ano de Admissão:" placeholder="dd/mm/aaaa" onChange={(value: string) => setAdmissao(value)} value={admissao}/>
                    <Input error={false} label="Formação:" placeholder="Insira a formação" onChange={(value: string) => setFormacao(value)} value={formacao}/>
                    <Input error={false} label="CTPS:" placeholder="0000000/0000" onChange={(value: string) => setCtps(value)} value={ctps}/>
                </View>
                <Button text="CADASTRAR FICHA" onPress={handleCreateEmployee}/>
              </View>
        </View>
      );
}