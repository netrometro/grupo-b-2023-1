import { StyleSheet } from 'react-native';

const stylesDashboard = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  body: {
    marginTop: 20,
    gap: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  iconButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
});

export default stylesDashboard;
