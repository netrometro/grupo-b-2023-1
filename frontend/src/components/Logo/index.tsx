import { View, Text } from 'react-native';
import stylesLogo from './styles';
import { Clock } from 'phosphor-react-native';
import React from 'react';

export default function Logo() {
  return (
    <View style={stylesLogo.container}>
      <View style={stylesLogo.background}>
        <Clock size={80} weight="bold" color="#4F67D8" />
      </View>
      <Text style={stylesLogo.logoText}>OptiStaff</Text>
    </View>
  );
}
