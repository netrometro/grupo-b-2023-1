import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import moment from 'moment';
import { XCircle } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../../components/Navbar';
import IconButton from '../../components/IconButton';
import { api } from '../../services/api';
import stylesFaltaDashboard from './style';


interface Falta {
  dataFalta: string;
  tipoFalta: string;
  descricaoFalta: string;
}

interface FaltaDashboardProps {
  route: { params: { employeeId: number } };
}

export default function FaltaDashboard({ route }: FaltaDashboardProps) {
    const { params: { employeeId } } = route;
    const [faltas, setFaltas] = useState<Falta[]>([]);

  useEffect(() => {
    const getFaltas = async () => {
      try {
        const response = await api.get(`/faltas/${employeeId}`);
        setFaltas(response.data);
      } catch (error) {
        console.error('Error fetching faltas:', error);
      }
    };

    getFaltas();
  }, [employeeId]);

  const { navigate } = useNavigation();

  const renderFaltaItem = ({ item }: { item: Falta }) => (
    <View style={stylesFaltaDashboard.faltaItem}>
      <Text style={stylesFaltaDashboard.faltaDate}>
        {moment(item.dataFalta).format('DD/MM/YYYY')}
      </Text>
      <Text style={stylesFaltaDashboard.faltaType}>{item.tipoFalta}</Text>
      <Text style={stylesFaltaDashboard.faltaDescription}>{item.descricaoFalta}</Text>
    </View>
  );

  return (
    <View style={stylesFaltaDashboard.container}>
      {<Navbar text={'Registro de Faltas'} onPressArrowLeft={() => navigate('EmployerDashboard')} />}

      <View style={stylesFaltaDashboard.body}>
        <FlatList
          data={faltas}
          keyExtractor={(item) => item.dataFalta}
          renderItem={renderFaltaItem}
          ListEmptyComponent={<Text>Nenhuma falta registrada.</Text>}
        />
        <View style={stylesFaltaDashboard.iconButtonContainer}>
          {<IconButton
            onPress={() => navigate('faltaRegister', { employeeId: employeeId })}
            text="Registrar Falta"
            icon={<XCircle size={38} weight="bold" color="#D84F4F" />}
          />}
        </View>
      </View>
    </View>
  );
}
