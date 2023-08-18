import { StyleSheet } from 'react-native';

const stylesInput = StyleSheet.create({
  container: {
    marginHorizontal: 30,
  },
  inputBox: {
    backgroundColor: 'white',
    borderColor: '#4F67D8',
    borderWidth: 2,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  input: {
    fontSize: 17,
    flex: 1,
    height: '100%',
  },
  label: {
    paddingLeft: 7,
  },
  errorMessage: {
    color: 'red',
  },
});

export default stylesInput;
