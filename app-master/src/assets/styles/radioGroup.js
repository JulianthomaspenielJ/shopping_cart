import { StyleSheet } from 'react-native'
import { robotoMedium } from './fonts'
import { darkCyan, dangerText } from '../../assets/styles/colors'

export const radioStyles = StyleSheet.create({
  labelStyle: {
    color: darkCyan,
    fontSize: 12,
    fontFamily: robotoMedium,
    fontWeight: '500',
    width: 59
  },
  labelStyleErr: {
    color: dangerText
  }
})
