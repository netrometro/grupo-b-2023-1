import stylesFichaRegistration from "./styles";
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from "react-native";
import Navbar from "../../components/Navbar";
import Input from "../../components/Input";
import Button from "../../components/Button";


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
        nacionalidade: nascimento,
        cpf: cpf,
        rg: rg,
        cargo: cargo,
        endereco: endereco,
        pispasep: pispasep,
        admissao: admissao,
        formacao: formacao,
        ctps: ctps,
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
                    <Input error={false} label="Nome:" placeholder="Nome Completo" onChange={(value: string) => setNome(value)}/>
                    <Input error={false} label="E-mail:" placeholder="email@email.com" onChange={(value: string) => setEmail(value)}/>
                    <Input error={false} label="Nascimento:" placeholder="dd/mm/aaaa" onChange={(value: string) => setNascimento(value)}/>
                    <Input error={false} label="Nacionalidade:" placeholder="Nacionalidade" onChange={(value: string) => setNacionalidade(value)}/>
                    <Input error={false} label="CPF:" placeholder="000.000.000-00" onChange={(value: string) => setCpf(value)}/>
                    <Input error={false} label="RG:" placeholder="0.000.000" onChange={(value: string) => setRg(value)}/>
                    <Input error={false} label="Cargo:" placeholder="Cargo exercido" onChange={(value: string) => setCargo(value)}/>
                    <Input error={false} label="Endereço:" placeholder="Insira o endereço completo" onChange={(value: string) => setEndereco(value)}/>
                    <Input error={false} label="Número do PIS/PASEP:" placeholder="0.000.000.000-0" onChange={(value: string) => setPispasep(value)}/>
                    <Input error={false} label="Ano de Admissão:" placeholder="dd/mm/aaaa" onChange={(value: string) => setAdmissao(value)}/>
                    <Input error={false} label="Formação:" placeholder="Insira a formação" onChange={(value: string) => setFormacao(value)}/>
                    <Input error={false} label="CTPS:" placeholder="0000000/0000" onChange={(value: string) => setCtps(value)}/>

                </View>
                <Button text="CADASTRAR FICHA" onPress={handleRegister}/>

              </View>
        </View>

      );

}