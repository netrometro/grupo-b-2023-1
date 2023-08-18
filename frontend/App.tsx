import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login';
import Dashboard from './src/screens/Dashboard';
import AdminRegistration from './src/screens/AdminRegistration';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* <Login /> */}
      {/* <Dashboard /> */}
      <AdminRegistration />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
  },
});
