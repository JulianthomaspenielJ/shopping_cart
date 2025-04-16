import { StyleSheet } from 'react-native'
import { darkCyan } from './colors'
import { nunitoSansRegular } from './fonts'

export const styles = StyleSheet.create({
  checkbox: {
    alignItems: 'flex-start'
  },
  icon: {
    width: 17,
    height: 17
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    paddingLeft: 10,
    fontSize: 14,
    color: darkCyan,
    fontFamily: nunitoSansRegular,
    fontWeight: '500'
  }
})
