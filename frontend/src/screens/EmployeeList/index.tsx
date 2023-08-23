import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import { api } from '../../services/api';
import { Employer } from '../../interfaces/employer';
import stylesEmployeeList from './style';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

interface Props { 
  companyId: number; 
  employeeId: number;
}

const EmployeeList: React.FC<Props> = ({companyId, employeeId}) => {
  const [employees, setEmployees] = useState<Employer[]>([]); 

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const adminId = await AsyncStorage.getItem('adminId');

        if (!adminId){
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

    fetchEmployees();
  }, []);

  const handleDeleteEmployee = async (employeeId: number) => {
    try {
      const adminId = await AsyncStorage.getItem('adminId');
      
      if (!adminId) {
        console.error('id de administrador inválido');
        return;
      }

      console.log('delete id: ', employeeId);
      console.log('adminId: ', adminId)

      const headers = {
        Authorization: adminId,
      };
      
      await api.delete(`/deleteFicha/${companyId}/${employeeId}`, { headers });
      ToastAndroid.show('Funcionário excluído', ToastAndroid.LONG);
            
      const updatedEmployees = employees.filter(employees => 
       employees.id !== employeeId);
       setEmployees(updatedEmployees);
    } catch (error) {
      console.error(error);
    }
  };

  const { navigate } = useNavigation();

  return (
    <View style={stylesEmployeeList.container}>
      <Text>Fichas de Funcionários da Empresa</Text>
      <FlatList
        data={employees}
        keyExtractor={item => item.nome} 
        renderItem={({ item }) => (
          <TouchableOpacity style={stylesEmployeeList.employeeItem}
          onPress={() => navigate('editEmployer', { companyId, employeeId})}
          >
            <Text style={stylesEmployeeList.employeeName}>{item.nome}</Text>
            <Text style={stylesEmployeeList.employeeInfo}>E-mail: {item.email}</Text>
            <Text style={stylesEmployeeList.employeeInfo}>Nascimento: {item.nascimento}</Text>
            <Text style={stylesEmployeeList.employeeInfo}>nacionalidade: {item.nacionalidade}</Text>
            <Text style={stylesEmployeeList.employeeInfo}>CPF: {item.cpf}</Text>
            <Text style={stylesEmployeeList.employeeInfo}>RG: {item.rg}</Text>
            <Text style={stylesEmployeeList.employeeInfo}>Cargo: {item.cargo}</Text>
            <Text style={stylesEmployeeList.employeeInfo}>Endereço: {item.endereco}</Text>
            <Text style={stylesEmployeeList.employeeInfo}>PIS/PASEP: {item.pispasep}</Text>
            <Text style={stylesEmployeeList.employeeInfo}>Admissão: {item.admissao}</Text>
            <Text style={stylesEmployeeList.employeeInfo}>Formação: {item.formacao}</Text>
            <Text style={stylesEmployeeList.employeeInfo}>CTPS: {item.ctps}</Text>
            <Button
              text="Excluir"
              onPress={() => handleDeleteEmployee(item.id)}
              isRed={true}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default EmployeeList;

