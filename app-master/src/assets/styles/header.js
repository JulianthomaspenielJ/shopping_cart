import { StyleSheet } from 'react-native'
import { tangerine, white, boxShadow, black } from './colors'
import { nunitoBold } from './fonts'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: tangerine,
    borderBottomLeftRadius: 21,
    borderBottomRightRadius: 21,
    shadowColor: boxShadow,
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 6,
    shadowOffset: {
      width: 1,
      height: 0
    }
  },
  header: {
    paddingVertical: 25,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backArrow: {
    width: 24,
    height: 14,
    margin: 10,
    padding: 5
  },
  title: {
    color: white,
    fontSize: 16,
    fontFamily: nunitoBold,
    fontWeight: '700',
    textAlign: 'center'
  },
  blacktitle: {
    color: black,
  }
})
