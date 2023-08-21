import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import stylesInput from './styles';
import React from 'react';

interface ComponentProps {
  placeholder: string;
  label: string;
  onChange: (value: string) => void;
  error: boolean;
  value: string;
  mask?: string;
  keyboardType?: KeyboardTypeOptions;
}

export default function Input({
  placeholder,
  label,
  onChange,
  error,
  value,
  mask,
  keyboardType,
}: ComponentProps) {
  return (
    <View style={stylesInput.container}>
      <Text style={stylesInput.label}>{label}</Text>
      <View style={stylesInput.inputBox}>
        <MaskedTextInput
          mask={mask}
          placeholder={placeholder}
          keyboardType={keyboardType}
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
