import { StyleSheet } from 'react-native';

const stylesCompanyDashboard = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  companyInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#4F67D8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  companyInfoCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 10,
    shadowColor: '#000',
  },
  body: {
    gap: 20,
    marginTop: 20,
  },
  iconsContainer: {
    gap: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default stylesCompanyDashboard;
