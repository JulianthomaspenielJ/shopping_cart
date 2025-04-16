import { StyleSheet } from 'react-native'
import { white } from './colors'
import { medium } from './fonts'

export const gradiant = StyleSheet.create({
  container: {
    paddingVertical: 8,
    borderRadius: 33
  },
  btnSquare: {
    paddingVertical: 8,
    borderRadius: 5
  },
  btnLabel: {
    textAlign: 'center',
    fontFamily: medium,
    fontWeight: '500',
    color: white,
    fontSize: 20
  }
})
