import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Clock, Eye, EyeSlash } from 'phosphor-react-native';
import stylesLongInput from './style';
import { useState } from 'react';
import React from 'react';

interface ComponentProps {
  placeholder: string;
  label: string;
  onChange: (value: string) => void;
  error: boolean;
  value: string;
  errorMessage?: string;
}

export default function LongInput({
  placeholder,
  label,
  onChange,
  error,
  value,
  errorMessage,
}: ComponentProps) {
  return (
    <View style={stylesLongInput.container}>
      <Text style={stylesLongInput.label}>{label}</Text>
      <View style={stylesLongInput.inputBox}>
        <TextInput
          aria-label="dsaiudhsau"
          placeholder={placeholder}
          cursorColor={'#4F67D8'}
          style={stylesLongInput.input}
          onChangeText={onChange}
          value={value}
          multiline
        />
      </View>
      {error ? <Text style={stylesLongInput.errorMessage}>{errorMessage}</Text> : <></>}
    </View>
  );
}
