import { View, Text, TextInput, Touchable, TouchableOpacity } from 'react-native';
import stylesLoginButton from './styles';

interface ComponentProps {
  onPress: () => void;
}

export default function LoginButton({ onPress }: ComponentProps) {
  return (
    <TouchableOpacity style={stylesLoginButton.background} onPress={onPress}>
      <Text style={stylesLoginButton.text}>ENTRAR</Text>
    </TouchableOpacity>
  );
}
