import { Text, TouchableOpacity } from 'react-native';
import stylesIconButton from './styles';
import { ReactNode, useState } from 'react';
import React from 'react';
import { User } from 'phosphor-react-native';

interface ComponentProps {
  onPress: () => void;
  text: string;
  icon: ReactNode;
}

export default function IconButton({ text, onPress, icon }: ComponentProps) {
  return (
    <TouchableOpacity onPress={onPress} style={stylesIconButton.background}>
      {icon}
      <Text style={stylesIconButton.text}>{text}</Text>
    </TouchableOpacity>
  );
}
