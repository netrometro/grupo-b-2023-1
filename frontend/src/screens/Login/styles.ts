import { StyleSheet } from 'react-native';

const stylesLogin = StyleSheet.create({
  container: {
    width: '100%',
    gap: 30,
  },
  background: {
    backgroundColor: '#4F67D8',
    height: 200,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    elevation: 20,
    shadowColor: '#000',
  },
  loginBox: {
    backgroundColor: 'white',
    height: 400,
    marginHorizontal: 20,
    borderRadius: 20,
    elevation: 20,
    shadowColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
  tagLine: {
    color: '#4F67D8',
    fontWeight: '700',
    fontSize: 18,
  },
  inputs: {
    width: '100%',
  },
});

export default stylesLogin;
