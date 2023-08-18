import { View, Text, TextInput, Touchable, TouchableOpacity } from 'react-native';
import stylesSignUpButton from './styles';

interface ComponentProps {
  onPress: () => void;
}

export default function SignUpButton({ onPress }: ComponentProps) {
  return (
    <TouchableOpacity style={stylesSignUpButton.background} onPress={onPress}>
      <Text style={stylesSignUpButton.text}>Cadastre-se</Text>
    </TouchableOpacity>
  );
}
