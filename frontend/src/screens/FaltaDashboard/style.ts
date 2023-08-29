import { StyleSheet } from 'react-native';

const stylesFaltaDashboard = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  body: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  faltaItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 5,
  },
  faltaDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  faltaType: {
    fontSize: 14,
    color: '#4F67D8',
    marginBottom: 5,
  },
  faltaDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  iconButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    marginRight: 20,
  },
});

export default stylesFaltaDashboard;
