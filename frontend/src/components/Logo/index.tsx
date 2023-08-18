import { View, Text } from 'react-native';
import stylesLogo from './styles';

export default function Logo() {
  return (
    <View style={stylesLogo.container}>
      <View style={stylesLogo.background}></View>
    </View>
  );
}
