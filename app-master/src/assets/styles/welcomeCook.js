import { StyleSheet, Platform } from 'react-native'
import {
  white,
  tangerine,
  boxShadow,
  tundora,
  gainsboro,
  corn,
  successText,
  dangerText,
  black,
  darkYellow
} from './colors'
import { semiBold, mtCorsva, medium, poppinsMedium } from './fonts'

export const welcomeCookStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: white
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '60%',
    height: '36%',
    flexDirection: 'column',
    top: -120,
    left: '35%'
  },
  container: {
    backgroundColor: tangerine,
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33,
    opacity: 0.8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    shadowColor: boxShadow,
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 8,
    shadowOffset: {
      width: 1,
      height: 0
    }
  },
  leftBorder: {
    borderColor: white,
    borderLeftWidth: 3,
    position: 'absolute',
    height: 23,
    left: 10,
    top: Platform.OS === 'ios' ? 7 : 11
  },
  bookCookText: {
    color: white,
    fontFamily: mtCorsva,
    fontSize: 33,
    fontWeight: '400',
    marginHorizontal: 20
  },
  navItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Platform.OS === 'ios' ? 30 : 10
  },
  welcomeCookContainer: {
    paddingHorizontal: 10
  },
  welcomeCookText: {
    flexDirection: 'row'
  },
  menuIconContainer: {
    marginTop: 16
  },
  menuIcon: {
    width: 23,
    height: 14
  },
  welcomeText: {
    color: black,
    fontFamily: semiBold,
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 10
  },
  switchText: {
    fontSize: 16,
    fontWeight: '700'
  },
  cookWelcomeIcon: {
    height: 20,
    width: 25,
    resizeMode: 'contain'
  },
  cookStatus: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cookName: {
    color: black,
    fontFamily: semiBold,
    fontSize: 18,
    fontWeight: '500'
  },
  switchStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  statusSwitchStyle: {
    shadowColor: boxShadow,
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 10,
    shadowOffset: {
      width: 1,
      height: 0
    }
  },
  requestContainer: {
    flex: 1,
    padding: 30
  },
  walletImg: {
    height: 22,
    width: 22,
    marginRight: 4,
    resizeMode: 'contain'
  },
  requestText: {
    color: tundora,
    fontFamily: medium,
    fontSize: 18,
    fontWeight: '500'
  },
  userData: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardBorder: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: gainsboro,
    marginVertical: 4
  },
  userLocationDetails: {
    color: tundora,
    fontFamily: medium,
    fontSize: 11,
    fontWeight: '500',
    paddingVertical: 3
  },
  addressCard: {
    fontSize: 10,
    fontFamily: medium,
    paddingTop: 22
  },
  userName: {
    fontFamily: semiBold,
    fontSize: 15
  },
  locationIcon: {
    paddingRight: 5,
    paddingTop: 5
  },
  locationIconArea: {
    flexDirection: 'row',
    paddingTop: 3
  },
  cookPaymentContainer: {
    justifyContent: 'flex-end'
  },
  amttext: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingTop: 4,
    paddingHorizontal: 8
  },
  timeslots: {
    paddingRight: 3,
    fontSize: 10
  },
  amttext1: {
    paddingTop: 0
  },
  paymentButtons: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: gainsboro,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 6
  },
  emptyAddress: {
    marginHorizontal: 0,
    top: 4
  },
  paymentSuccess: {
    color: successText
  },
  paymentReject: {
    color: dangerText
  },
  paymentSuccessText: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  paymentText: {
    fontFamily: medium,
    fontSize: 13,
    fontWeight: '600'
  },
  orderAccept: {
    fontSize: 13,
    fontFamily: semiBold,
    paddingTop: 0,
    fontWeight: '600'
  },
  locationAccepted: {
    backgroundColor: corn,
    borderWidth: 1,
    borderColor: corn,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: 30,
    width: 30,
    left: 40,
    top: 110
  },
  directions: {
    flexDirection: 'row'
  },
  directionIcon: {
    marginTop: 4,
    marginRight: 4,
    height: 10,
    width: 7,
    resizeMode: 'stretch'
  },
  directionsText: {
    color: corn
  },
  userList: {
    paddingTop: 20,
    paddingBottom: 30
  },
  payButton: {
    paddingVertical: 10,
    marginTop: 20
  },
  cancelText: {
    marginTop: 15
  },
  cancelTextContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  directionButton: {
    position: 'relative',
    top: -3,
    left: 10
  },
  payOption: {
    paddingHorizontal: 15
  },
  mapIcon: {
    height: 10,
    width: 7,
    resizeMode: 'stretch',
    marginRight: 8
  },
  norecord: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  norecordtext: {
    fontSize: 16,
    fontFamily: medium
  },
  orderCompletedContainer: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 33
  },
  orderCompleted: {
    textAlign: 'center',
    fontFamily: medium,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: white,
    fontSize: 10
  },
  refresh: {
    color: black,
    fontFamily: poppinsMedium,
    fontSize: 12,
    fontWeight: '500',
    backgroundColor: darkYellow,
    padding: 3,
    paddingHorizontal: 15,
    borderRadius: 8
  }
})
