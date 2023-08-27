import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import stylesOvertimeCard from './styles';
import { Trash } from 'phosphor-react-native';

interface OvertimeCardProps {
  data: string;
  horas: number;
  pago: boolean;
  valorHora: number;
  onPressDelete: () => void;
  onPressPay: () => void;
  isLoading: boolean;
}

export default function OvertimeCard({
  data,
  horas,
  pago,
  valorHora,
  onPressDelete,
  onPressPay,
  isLoading,
}: OvertimeCardProps) {
  return (
    <View style={stylesOvertimeCard.container}>
      <View>
        <Text>Data: {data}</Text>
        <Text>{horas} horas</Text>
        <Text>{pago ? 'Pago' : 'Não pago'}</Text>
        <Text>Valor por hora: R${valorHora}</Text>
        <Text>Total: R${valorHora * horas}</Text>
      </View>
      <View style={stylesOvertimeCard.actionsContainer}>
        {pago ? (
          <View style={stylesOvertimeCard.overtimeButtonPaid}>
            <Text style={stylesOvertimeCard.overtimeButtonText}>Pagar</Text>
          </View>
        ) : isLoading ? (
          <ActivityIndicator size="small" color="#4F67D8" />
        ) : (
          <TouchableOpacity style={stylesOvertimeCard.overtimeButton} onPress={onPressPay}>
            <Text style={stylesOvertimeCard.overtimeButtonText}>Pagar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onPressDelete}>
          <Trash size={32} weight="bold" color="#D84F4F" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
