import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { api } from '../../services/api';
import { Employer } from '../../interfaces/employer';
import stylesDemisionList from './styles'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserSquare } from 'phosphor-react-native';

interface Props {
  route: { params: { companyId: number } };
}

export default function DemisionList({ route }: Props) {
  const [demitidos, setDemitidos] = useState<Employer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { companyId } = route.params;

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

        console.log('adminId: ', adminId);
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
  }, [companyId]);

  return (
    <View style={stylesDemisionList.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#4F67D8" />
      ) : (
        <FlatList
          data={demitidos}
          style={stylesDemisionList.flatList}
          keyExtractor={(item) => item.nome}
          renderItem={({ item }) => (
            <View style={stylesDemisionList.employeeItem}>
              <View style={stylesDemisionList.iconNameContainer}>
                <UserSquare size={52} weight='fill' color='#4F67DB'/>
                <Text style={stylesDemisionList.employeeName}>{item.nome}</Text>
                <Text style={stylesDemisionList.employeeInfo}>CPF: {item.cpf}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
