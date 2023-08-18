import { View, Text, TouchableOpacity } from 'react-native';
import stylesNavbar from './styles';
import { ArrowLeft } from 'phosphor-react-native';

interface ComponentProps {
  text: string;
  onPressArrowLeft: () => void;
}

export default function Navbar({ text, onPressArrowLeft }: ComponentProps) {
  return (
    <View style={stylesNavbar.container}>
      <View style={stylesNavbar.contentContainer}>
        <TouchableOpacity onPress={onPressArrowLeft}>
          <ArrowLeft size={32} color="white" weight="bold" />
        </TouchableOpacity>
        <View style={stylesNavbar.textContainer}>
          <Text style={stylesNavbar.navbarText}>{text}</Text>
        </View>
      </View>
    </View>
  );
}
