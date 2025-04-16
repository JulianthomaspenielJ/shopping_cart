import { StyleSheet, Platform } from 'react-native'
import {
  white,
  tangerine,
  transparent,
  boxShadow
} from './colors'
import { medium } from './fonts'

export const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: tangerine,
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33,
    shadowColor: boxShadow,
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 6,
    shadowOffset: {
      width: 1,
      height: 0
    }
  },
  navArea: {
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    paddingTop: 15,
    ...Platform.select({
      ios: {
        padding: 15
      },
      android: {
        paddingHorizontal: 15
      }
    })
  },
  titleHolder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '10%'
  },
  headerTitle: {
    color: white,
    fontSize: 16,
    fontFamily: medium,
    fontWeight: '700'
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderBottomColor: transparent,
    borderBottomWidth: 3,
    marginHorizontal: 30
  },
  tabButtonActive: {
    borderBottomColor: white
  },
  tabButtonText: {
    textAlign: 'center',
    color: white,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: medium
  },
  tabButtonTextInactive: {
    opacity: 0.58
  },
  userLandingcontainer: {
    borderRadius: 25
  },
  backArrow: {
    width: 26,
    height: 14,
    resizeMode: 'contain'
  },
  menuContainer: {
    paddingRight: 10,
    paddingTop: 5
  },
  statusBarcontainer: {
    padding: 0,
    backgroundColor: tangerine,
    shadowColor: boxShadow,
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 6,
    shadowOffset: {
      width: 1,
      height: 0
    }
  }
})
