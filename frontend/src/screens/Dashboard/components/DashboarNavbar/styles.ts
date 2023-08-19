import { StyleSheet } from 'react-native';

const stylesDashboardNavbar = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#4F67D8',
    height: 110,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  dashboardText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 18,
  },
});

export default stylesDashboardNavbar;
