import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Clock, Eye, EyeSlash } from 'phosphor-react-native';
import stylesPasswordInput from './styles';
import { useState } from 'react';

interface ComponentProps {
  placeholder: string;
  label: string;
  onChange: (value: string) => void;
  error: boolean;
  value: string;
}

export default function PasswordInput({
  placeholder,
  label,
  onChange,
  error,
  value,
}: ComponentProps) {
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <View style={stylesPasswordInput.container}>
      <Text style={stylesPasswordInput.label}>{label}</Text>
      <View style={stylesPasswordInput.inputBox}>
        <TextInput
          aria-label="dsaiudhsau"
          placeholder={placeholder}
          cursorColor={'#4F67D8'}
          style={stylesPasswordInput.input}
          onChangeText={onChange}
          secureTextEntry={!visibility}
          value={value}
        />
        <TouchableOpacity onPress={toggleVisibility}>
          {visibility ? <Eye size={28} color="#4F67D8" /> : <EyeSlash size={28} color="#4F67D8" />}
        </TouchableOpacity>
      </View>
      {error ? <Text style={stylesPasswordInput.errorMessage}>Erro</Text> : <></>}
    </View>
  );
}
