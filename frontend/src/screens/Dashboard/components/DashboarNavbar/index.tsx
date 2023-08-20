import { TouchableOpacity, View, Text } from 'react-native';
import stylesDashboardNavbar from './styles';
import { SignOut } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { api } from '../../../../services/api';
import React from 'react';

export default function DashboardNavbar() {
  const [name, setName] = useState('');

  useEffect(() => {
    console.log('fui chamado');
    const admin = async () => {
      const id = await AsyncStorage.getItem('adminId');
      try {
        const response = await api.get(`/admin/${id}`);
        setName(response.data.nome);
      } catch (error) {
        console.log(error);
      }
    };

    admin();
  }, []);

  type Nav = {
    navigate: (value: string) => void;
  };

  const { navigate } = useNavigation<Nav>();

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('adminId');
    navigate('login');
  };

  return (
    <View style={stylesDashboardNavbar.container}>
      <View style={stylesDashboardNavbar.content}>
        <Text style={stylesDashboardNavbar.dashboardText}>Olá, {name}</Text>
        <TouchableOpacity onPress={handleSignOut}>
          <SignOut size={32} color="white" weight="bold" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
