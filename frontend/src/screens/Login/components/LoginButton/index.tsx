import { Text, TouchableOpacity } from 'react-native';
import stylesLoginButton from './styles';
import React from 'react';

interface ComponentProps {
  onPress: () => void;
}

export default function LoginButton({ onPress }: ComponentProps) {
  return (
    <TouchableOpacity style={stylesLoginButton.background} onPress={onPress}>
      <Text style={stylesLoginButton.text}>ENTRAR</Text>
    </TouchableOpacity>
  );
}
