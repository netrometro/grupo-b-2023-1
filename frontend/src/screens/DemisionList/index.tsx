import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { api } from '../../services/api';
import { Employer } from '../../interfaces/employer';
import stylesEmployeeList from '../EmployeeList/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { DotsThree, Trash, UserSquare } from 'phosphor-react-native';

type Nav = {
  navigate: (value: string, ids?: object) => void;
};

interface Props {
  companyId: number;
}

export default function DemisionList({ companyId }: Props) {
  const [employees, setEmployees] = useState<Employer[]>([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setisLoading(true);
        const adminId = await AsyncStorage.getItem('adminId');

        if (!adminId) {
          console.error('ID de administrador inválido');
          setisLoading(false);
          return;
        }

         console.log("companyId: ", companyId);

        const response = await api.get(`/demitidos/${companyId}`, {
          headers: {
            Authorization: adminId,
          },
        });

        setEmployees(response.data);
        setisLoading(false);
      } catch (error) {
        console.error(error);
        setisLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const { navigate } = useNavigation<Nav>();

  return (
    <View style={stylesEmployeeList.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#4F67D8" />
      ) : (
        <FlatList
          data={employees}
          style={stylesEmployeeList.flatList}
          keyExtractor={(item) => item.nome}
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
                <TouchableOpacity
                  onPress={() => navigate('employerDashboard', { employeeId: item.id, companyId })}
                >
                  <DotsThree size={35} weight="bold" color="#4F67D8" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

