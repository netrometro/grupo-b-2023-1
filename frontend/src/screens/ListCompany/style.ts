import { StyleSheet } from 'react-native';

const stylesListCompany = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    height: '72%',
  },
  companyItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: '100%',
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
  flatList: {
    width: '100%',
    paddingHorizontal: 30,
  },
  iconsContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default stylesListCompany;
