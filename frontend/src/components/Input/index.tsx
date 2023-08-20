import { View, Text, TextInput } from 'react-native';
import stylesInput from './styles';
import React from 'react';

interface ComponentProps {
  placeholder: string;
  label: string;
  onChange: (value: string) => void;
  error: boolean;
  value: string;
}

export default function Input({ placeholder, label, onChange, error, value }: ComponentProps) {
  return (
    <View style={stylesInput.container}>
      <Text style={stylesInput.label}>{label}</Text>
      <View style={stylesInput.inputBox}>
        <TextInput
          placeholder={placeholder}
          cursorColor={'#4F67D8'}
          style={stylesInput.input}
          onChangeText={onChange}
          value={value}
        />
      </View>
      {error ? <Text style={stylesInput.errorMessage}>Erro</Text> : <></>}
    </View>
  );
}
