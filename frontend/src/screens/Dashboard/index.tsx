import { View, Text, TouchableOpacity } from 'react-native';
import stylesDashboard from './styles';
import DashboardNavbar from './components/DashboarNavbar';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../interfaces/user';
import React from 'react';
import ListCompany from '../ListCompany';

export default function Dashboard() {
  const [user, setUser] = useState<User>();
  type Nav = {
    navigate: (value: string) => void;
  };

  useEffect(() => {
    const admin = async () => {
      const id = await AsyncStorage.getItem('adminId');
      try {
        const response = await api.get(`/admin/${id}`);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    admin();
  }, []);

  const { navigate } = useNavigation<Nav>();

  const handleMyInformations = () => {
    navigate('adminEditInfo');
  };

  const handleCreateCompany = () => {
    navigate('companyRegistration')
  }

  return (
    <View style={stylesDashboard.container}>
      <DashboardNavbar />
      <View style={stylesDashboard.body}>
        <Button onPress={handleMyInformations} text="Minhas informações" />
        <Button onPress={handleCreateCompany} text="Adicionar Empresa" />
        <ListCompany />
      </View>
    </View>
  );
}
