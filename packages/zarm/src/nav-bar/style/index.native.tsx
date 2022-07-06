import variables from '../../style/themes/default.native';

export default {
  navBarWrapper: {
    height: 60,
    backgroundColor: variables.theme_primary,
    borderBottomWidth: 1,
    borderBottomColor: '#A7A7AA',
  },
  navBarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titleWrapper: {
    flex: 1,
  },
  titleText: {
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 16,
    color: '#fff',
  },
  btn: {
    color: '#fff',
    paddingLeft: 9,
    paddingRight: 9,
    fontSize: 16,
    minWidth: 50,
  },
  rightBtn: {
    color: '#108ee9',
  },
};
