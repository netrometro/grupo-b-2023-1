import { Text, TouchableOpacity } from 'react-native';
import stylesButton from './styles';

interface ComponentProps {
  onPress: () => void;
  text: string;
}

export default function Button({ text, onPress }: ComponentProps) {
  return (
    <TouchableOpacity style={stylesButton.background} onPress={onPress}>
      <Text style={stylesButton.text}>{text}</Text>
    </TouchableOpacity>
  );
}
