import { StyleSheet } from 'react-native';

const stylesAdminEditInfo = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  inputs: {
    gap: 10,
    width: '100%',
  },
  buttons: {
    gap: 10,
  },
});

export default stylesAdminEditInfo;
