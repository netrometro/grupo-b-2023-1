import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import { api } from '../../services/api';
import { Employer } from '../../interfaces/employer';
import stylesEmployeeList from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { DotsThree, Trash, UserSquare } from 'phosphor-react-native';
import Button from '../../components/Button';

type Nav = {
  navigate: (value: string, ids?: object) => void;
};

interface Props {
  companyId: number;
}

export default function EmployeeList({ companyId }: Props) {
  const [employees, setEmployees] = useState<Employer[]>([]);

  useEffect(() => {
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
      console.log('adminId: ', adminId);

      const headers = {
        Authorization: adminId,
      };

      await api.delete(`/deleteFicha/${companyId}/${employeeId}`, { headers });
      ToastAndroid.show('Funcionário excluído', ToastAndroid.LONG);

      const updatedEmployees = employees.filter((employees) => employees.id !== employeeId);
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error(error);
    }
  };

  const { navigate } = useNavigation<Nav>();

  return (
    <View style={stylesEmployeeList.container}>
      <FlatList
        data={employees}
        style={stylesEmployeeList.flatList}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View
            style={stylesEmployeeList.employeeItem}
            // onPress={() => navigate('editEmployer', { companyId, employeeId: item.id })}
          >
            <View style={stylesEmployeeList.iconNameContainer}>
              <UserSquare size={52} weight="fill" color="#4F67D8" />
              <View>
                <Text style={stylesEmployeeList.employeeName}>{item.nome}</Text>
                <Text style={stylesEmployeeList.employeeInfo}>CPF: {item.cpf}</Text>
              </View>
            </View>
            <View style={stylesEmployeeList.buttonsContainer}>
              <TouchableOpacity onPress={() => handleDeleteEmployee(item.id)}>
                <Trash weight="bold" size={28} color="#D84F4F" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigate('employerDashboard', { companyId, employeeId: item.id })}
              >
                <DotsThree size={35} weight="bold" color="#4F67D8" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
