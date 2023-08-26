import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { api } from '../../services/api';
import { Emp } from '../../interfaces/emp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesListCompany from './style';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import { DotsThree, Trash } from 'phosphor-react-native';

const ListCompany: React.FC = () => {
  const [companies, setCompanies] = useState<Emp[]>([]);

  type Nav = {
    navigate: (value: string, id: object) => void;
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const adminId = await AsyncStorage.getItem('adminId');

        if (!adminId) {
          console.error('ID de administrador inválido');
          return;
        }

        const response = await api.get(`/getEmp`, {
          headers: {
            Authorization: adminId,
          },
        });

        setCompanies(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompanies();
  }, []);

  const handleDeleteCompany = async (companyId: number) => {
    try {
      const adminId = await AsyncStorage.getItem('adminId');

      if (!adminId) {
        console.error('id de administrador inválido');
        return;
      }

      console.log('delete id: ', companyId);
      console.log('adminId: ', adminId);

      const headers = {
        Authorization: adminId,
      };

      await api.delete(`/deleteEmp/${companyId}`, { headers });
      ToastAndroid.show('empresa excluida', ToastAndroid.LONG);

      const updatedCompanies = companies.filter((company) => company.id !== companyId);
      setCompanies(updatedCompanies);
    } catch (error) {
      console.error(error);
    }
  };

  const { navigate } = useNavigation<Nav>();

  return (
    <View style={stylesListCompany.container}>
      <FlatList
        data={companies}
        style={stylesListCompany.flatList}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => (
          <View
            style={stylesListCompany.companyItem}
            // onPress={() => navigate('companyDashboard', { companyId: item.id })}
          >
            <Text style={stylesListCompany.companyName}>Empresa {item.nome}</Text>
            <Text style={stylesListCompany.companyInfo}>CNPJ: {item.cnpj}</Text>
            <Text style={stylesListCompany.companyInfo}>Endereço: {item.endereco}</Text>
            <Text style={stylesListCompany.companyInfo}>CEP: {item.cep}</Text>
            <View style={stylesListCompany.iconsContainer}>
              <TouchableOpacity onPress={() => handleDeleteCompany(item.id)}>
                <Trash size={28} weight="bold" color="#D84F4F" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigate('companyDashboard', { companyId: item.id })}
              >
                <DotsThree size={35} weight="bold" color="#4F67D8" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ListCompany;
