import { StyleSheet } from 'react-native';

const stylesEmployeeList = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F7F8FA', // Cor de fundo semelhante ao Dashboard
  },
  employeeItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: 300,
    alignSelf: 'center',
    elevation: 5,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  employeeInfo: {
    marginTop: 5,
    fontSize: 14,
    color: '#6B7280', // Cor de texto semelhante ao Dashboard
  },
});

export default stylesListCompany;
