import { StyleSheet } from 'react-native';

const stylesOvertimeCard = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 30,
    gap: 11,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#000',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overtimeButton: {
    backgroundColor: '#4F67D8',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  overtimeButtonPaid: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  overtimeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default stylesOvertimeCard;
