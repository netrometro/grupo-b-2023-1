import { StyleSheet } from 'react-native';

const stylesNavbar = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#4F67D8',
    height: 110,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingRight: 84,
    paddingBottom: 15,
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  navbarText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
  },
});

export default stylesNavbar;
