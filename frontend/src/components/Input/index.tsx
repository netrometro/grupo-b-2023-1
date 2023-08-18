import { View, Text, TextInput } from 'react-native';
import stylesInput from './styles';

interface ComponentProps {
  placeholder: string;
  label: string;
  onChange: () => void;
  error: boolean;
}

export default function Input({ placeholder, label, onChange, error }: ComponentProps) {
  return (
    <View style={stylesInput.container}>
      <Text style={stylesInput.label}>{label}</Text>
      <View style={stylesInput.inputBox}>
        <TextInput
          placeholder={placeholder}
          cursorColor={'#4F67D8'}
          style={stylesInput.input}
          onChange={onChange}
        />
      </View>
      {error ? <Text style={stylesInput.errorMessage}>Erro</Text> : <></>}
    </View>
  );
}
