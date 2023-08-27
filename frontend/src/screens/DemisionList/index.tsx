import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { api } from '../../services/api';
import { Employer } from '../../interfaces/employer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserSquare } from 'phosphor-react-native';

type Nav = {
    navigate: (value: string, ids?: object) => void;
  };

type Props = {
  companyId: number;
};

export default function EmployeeList({ companyId }: Props) {
  const [demitidos, setDemitidos] = useState<Employer[]>([]);

  useEffect(() => {
    const fetchDemitidos = async () => {
      try {
        const adminId = await AsyncStorage.getItem('adminId');

        if (!adminId) {
          console.error('ID de administrador inválido');
          return;
        }

        console.log('companyId: ', companyId);

        const response = await api.get(`/demitidos/${companyId}`, {
          headers: {
            Authorization: adminId,
          },
        });

        setDemitidos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDemitidos();
  }, []);

  return (
    <View>
      <FlatList
        data={demitidos}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => (
          <View
          >
            <View>
              <UserSquare size={52} weight="fill" color="#4F67D8" />
              <View>
                <Text>{item.nome}</Text>
                <Text>CPF: {item.cpf}</Text>
              </View>
            </View>
            <View>
            </View>
          </View>
        )}
      />
    </View>
  );
};


