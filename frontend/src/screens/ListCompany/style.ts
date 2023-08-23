import { StyleSheet } from 'react-native';

const stylesListCompany = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
  },
  companyItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: 300,
    alignSelf: 'center',
    elevation: 5,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  companyInfo: {
    marginTop: 5,
    fontSize: 14,
    color: '#6B7280',
  },
});

export default stylesListCompany;
