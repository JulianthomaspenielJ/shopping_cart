import { StyleSheet } from 'react-native'
import { white, dangerText } from './colors'

export const common = StyleSheet.create({
  shadow: {
    backgroundColor: '#ECEEF6'
  },
  padHPrimary: {
    paddingHorizontal: 15
  },
  errorMsgText: {
    color: dangerText,
    fontSize: 12
  },
  containerBackground: {
    flex: 1,
    backgroundColor: white
  },
  paddingTopPrimary: {
    paddingTop: 15
  },
  blackArrow: {
    padding: 25,
    position: 'absolute',
  }
})
