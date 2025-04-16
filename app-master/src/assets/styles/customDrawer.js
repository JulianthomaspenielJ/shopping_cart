import { StyleSheet, Platform } from 'react-native'
import {
  white,
  black
} from './colors'
import { poppinSemiBold } from './fonts'

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  gradiant: {
    flex: 1
  },
  closeHolder: {
    alignItems: 'flex-end',
    paddingTop: Platform.OS === 'ios' ? 40 : 0
  },
  close: {
    fontSize: 40,
    color: black,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  profile: {
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: black,
    marginHorizontal: 25,
    paddingBottom: 20
  },
  profileImg: {
    width: 73,
    height: 73,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: white
  },
  name: {
    color: black,
    fontSize: 13,
    fontFamily: poppinSemiBold,
    fontWeight: '600',
    paddingVertical: 5
  },
  phone: {
    color: black,
    fontSize: 12,
    fontFamily: poppinSemiBold,
    fontWeight: '500'
  },
  menu: {
    flex: 1
  },
  menuItem: {
    paddingVertical: 20,
    alignItems: 'center'
  },
  menuTitle: {
    color: black,
    fontFamily: poppinSemiBold,
    fontWeight: '600',
    fontSize: 13
  },
  hline: {
    borderWidth: Platform.OS === 'ios' ? 0.5 : 0.3,
    borderColor: black,
    marginTop: 20,
    width: 27
  }
})
