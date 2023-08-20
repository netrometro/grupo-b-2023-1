import { Text, TouchableOpacity } from 'react-native';
import stylesButton from './styles';
import { useState } from 'react';
import React from 'react';

interface ComponentProps {
  onPress: () => void;
  text: string;
  isRed?: boolean;
}

export default function Button({ text, onPress, isRed }: ComponentProps) {
  const [backgroundColor, setBackgroundColor] = useState(isRed ? '#D84F4F' : '#4F67D8');

  return (
    <TouchableOpacity style={[stylesButton.background, { backgroundColor }]} onPress={onPress}>
      <Text style={stylesButton.text}>{text}</Text>
    </TouchableOpacity>
  );
}
