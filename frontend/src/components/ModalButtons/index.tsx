import { Text, TouchableOpacity, View } from 'react-native';
import stylesButton from './style';
import React from 'react';

interface ComponentProps {
  onPressBlueButton: () => void;
  onPressRedButton: () => void;
  blueText: string;
  redText: string;
}

export default function ModalButtons({
  blueText,
  onPressRedButton,
  onPressBlueButton,
  redText,
}: ComponentProps) {
  return (
    <View style={stylesButton.modalButtonContainer}>
      <TouchableOpacity style={stylesButton.redBackground} onPress={onPressRedButton}>
        <Text style={stylesButton.text}>{redText}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={stylesButton.blueBackground} onPress={onPressBlueButton}>
        <Text style={stylesButton.text}>{blueText}</Text>
      </TouchableOpacity>
    </View>
  );
}
