import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
  dropDownBox: {
    height: 50,
    width: 300,
    borderWidth: 0.5,
    position: 'absolute',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
  dropDownText: {
    alignSelf: 'center',
    fontSize: 20,
    marginLeft: 10,
  },
  listProvince: {
    height: 600,
    width: 300,
    marginTop: 70,
    alignSelf: 'center',
    borderWidth: 0.5,
    position: 'absolute',
    backgroundColor: 'white',
  },
  itemProvince: {
    borderWidth: 1,
    padding: 10,
  },
  dropDownTitle: {
    width: '80%',
    flexDirection: 'row',
  },
  dropDownClose: {
    width: '20%',
  },
  closeWatchProvince: {fontSize: 40, alignSelf: 'center'},
});
