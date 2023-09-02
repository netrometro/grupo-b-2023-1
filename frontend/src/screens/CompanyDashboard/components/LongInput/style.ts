import { StyleSheet } from 'react-native';

const stylesLongInput = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputBox: {
    borderColor: '#4F67D8',
    borderWidth: 2,
    height: 200,
    borderRadius: 10,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  input: {
    fontSize: 17,
    flex: 1,
    height: '100%',
    alignContent: 'flex-start',
    textAlignVertical: 'top',
  },
  label: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 7,
  },
  errorMessage: {
    color: 'red',
  },
});

export default stylesLongInput;
