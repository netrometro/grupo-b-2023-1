import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { api } from '../../services/api';
import { Employer } from '../../interfaces/employer';
import stylesEmployeeList from '../EmployeeList/style';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  companyId: number;
}

export default function DemisionList({ companyId }: Props) {
  const [demitidos, setDemitidos] = useState<Employer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDemitidos = async () => {
      try {
        setIsLoading(true);
        const adminId = await AsyncStorage.getItem('adminId');

        if (!adminId) {
          console.error('ID de administrador inválido');
          setIsLoading(false);
          return;
        }

        console.log('companyId: ', companyId);

        const response = await api.get(`/demitidos/${companyId}`, {
          headers: {
            Authorization: adminId,
          },
        });

        setDemitidos(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchDemitidos();
  }, []);

  return (
    <View style={stylesEmployeeList.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#4F67D8" />
      ) : (
        <FlatList
          data={demitidos}
          style={stylesEmployeeList.flatList}
          keyExtractor={(item) => item.nome}
          renderItem={({ item }) => (
            <View style={stylesEmployeeList.employeeItem}>
              <View style={stylesEmployeeList.iconNameContainer}>
                <Text style={stylesEmployeeList.employeeName}>{item.nome}</Text>
                <Text style={stylesEmployeeList.employeeInfo}>CPF: {item.cpf}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
