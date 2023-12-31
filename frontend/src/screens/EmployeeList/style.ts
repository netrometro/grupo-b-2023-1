import { StyleSheet } from 'react-native';

const stylesEmployeeList = StyleSheet.create({
  container: {
    width: '100%',
    height: '60%',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  employeeItem: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignSelf: 'center',
    elevation: 5,
    backgroundColor: 'white',
    gap: 6,
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  employeeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  employeeInfo: {
    fontSize: 14,
    color: '#6B7280',
  },
  flatList: {
    width: '100%',
    paddingHorizontal: 30,
  },
});

export default stylesEmployeeList;
