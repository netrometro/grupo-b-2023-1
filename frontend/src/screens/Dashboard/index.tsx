import { View, Text, TouchableOpacity } from 'react-native';
import stylesDashboard from './styles';
import DashboardNavbar from './components/DashboarNavbar';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Buildings, User } from 'phosphor-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserInterface } from '../../interfaces/user';
import React from 'react';
import ListCompany from '../ListCompany';
import IconButton from '../../components/IconButton';

export default function Dashboard() {
  const [user, setUser] = useState<UserInterface>();
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
    navigate('companyRegistration');
  };

  return (
    <View style={stylesDashboard.container}>
      <DashboardNavbar />
      <View style={stylesDashboard.body}>
        <View style={stylesDashboard.iconButtonContainer}>
          <IconButton
            onPress={handleMyInformations}
            text="Minhas informações"
            icon={<User size={38} weight="bold" color="#4F67D8" />}
          />
          <IconButton
            onPress={handleCreateCompany}
            text="Adicionar Empresa"
            icon={<Buildings size={38} weight="bold" color="#4F67D8" />}
          />
        </View>
        <ListCompany />
      </View>
    </View>
  );
}
