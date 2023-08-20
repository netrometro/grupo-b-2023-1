import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { api } from '../../services/api';
import { Emp } from '../../interfaces/emp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesListCompany from './style';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';

const ListCompany: React.FC = () => {
    const [companies, setCompanies] = useState<Emp[]>([]);
  
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
            console.log('adminId: ', adminId)

            const headers = {
                Authorization: adminId,
            };
            
            await api.delete(`/deleteEmp/${companyId}`, { headers });
            ToastAndroid.show('empresa excluida', ToastAndroid.LONG);

            const updatedCompanies = companies.filter(company => company.id !== companyId);
            setCompanies(updatedCompanies);
        }   catch (error) {
            console.error(error);
        }
    };

    const { navigate } = useNavigation();
  
    return (
      <View style={stylesListCompany.container}>
        <Text>Empresas que você Gerencia:</Text>
        <FlatList
          data={companies}
          keyExtractor={(item) => item.nome}
          renderItem={({ item }) => (
            <TouchableOpacity 
               style={stylesListCompany.companyItem} >
              <Text style={stylesListCompany.companyName}>{item.nome}</Text>
              <Text style={stylesListCompany.companyInfo}>CNPJ: {item.cnpj}</Text>
              <Text style={stylesListCompany.companyInfo}>Endereço: {item.endereco}</Text>
              <Text style={stylesListCompany.companyInfo}>CEP: {item.cep}</Text>
              <Button 
                text="Excluir"
                onPress={() => handleDeleteCompany(item.id)}
                isRed={true}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };
  
  export default ListCompany;
  