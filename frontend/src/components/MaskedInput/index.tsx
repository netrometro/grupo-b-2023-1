import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import stylesMaskedInput from './styles';
import React from 'react';

interface ComponentProps {
  placeholder: string;
  label: string;
  onChange: (value: string) => void;
  error: boolean;
  value: string;
  mask?: string;
  keyboardType?: KeyboardTypeOptions;
  errorMessage?: string;
}

export default function MaskedInput({
  placeholder,
  label,
  onChange,
  error,
  value,
  mask,
  keyboardType,
  errorMessage,
}: ComponentProps) {
  return (
    <View style={stylesMaskedInput.container}>
      <Text style={stylesMaskedInput.label}>{label}</Text>
      <View style={stylesMaskedInput.inputBox}>
        <MaskedTextInput
          mask={mask}
          placeholder={placeholder}
          keyboardType={keyboardType}
          cursorColor={'#4F67D8'}
          style={stylesMaskedInput.input}
          onChangeText={onChange}
          value={value}
        />
      </View>
      {error ? <Text style={stylesMaskedInput.errorMessage}>{errorMessage}</Text> : <></>}
    </View>
  );
}
