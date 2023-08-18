import { Text, TouchableOpacity } from 'react-native';
import stylesButton from './styles';

export default function Button() {
  return (
    <TouchableOpacity style={stylesButton.background}>
      <Text>Minhas informações</Text>
    </TouchableOpacity>
  );
}
