import { StyleSheet, Platform } from 'react-native'
import { corn, Wattle, eerieBlack, white, grey20, gainsboro, graniteGray, darkYellow } from './colors'
import { medium, poppinsBoldText } from './fonts'

export const cookWallet = StyleSheet.create({
  mainContainerFluid: {
    flex: 1,
    backgroundColor: white
  },
  mainContainer: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 15,
  },
  walletBgImage: {
    width: '100%',
    height: 110,
    borderRadius: 100,
    alignSelf: 'center'
  },
  walletBgImageContainer: {
    padding: 25
  },
  rupeeContainer: {
    flexDirection: 'row'
  },
  icon: {
    paddingTop: 5,
    paddingRight: 5
  },
  iconText: {
    color: corn,
    fontFamily: medium,
    fontSize: 20,
    fontWeight: '900'
  },
  balanceText: {
    color: eerieBlack,
    fontFamily: medium,
    fontSize: 12,
    fontWeight: '400',
    marginTop: 15
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  addIconContainer: {
    backgroundColor: Wattle,
    borderColor: Wattle,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  addIcon: {
    color: white
  },
  withdrawContainer: {
    marginTop: 15,
    paddingVertical: 10,
    borderRadius: 33,
    marginLeft: 5,
    width: '25%'
  },
  withdraw: {
    textAlign: 'center',
    fontFamily: medium,
    fontWeight: '700',
    color: white,
    fontSize: 12
  },
  recentTransaction: {
    paddingHorizontal: 5,
    paddingVertical: 20,
    color: grey20,
    fontFamily: medium,
    fontSize: 14,
    fontWeight: '600'
  },
  walletImg: {
    height: 45,
    width: 45,
    resizeMode: 'stretch'
  },
  transactionContainer: {
    borderWidth: 1,
    borderColor: gainsboro,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 15
  },
  transactionText: {
    color: grey20,
    fontFamily: medium,
    fontWeight: '500',
    fontSize: 12,
    textAlign: 'left'
  },
  transactionDateContainer: {
    padding: 8
  },
  dateText: {
    color: graniteGray,
    fontFamily: medium,
    fontWeight: '400',
    fontSize: 11,
    textAlign: 'left'
  },
  rupeeIcon: {
    paddingTop: 5,
    paddingRight: 3
  },
  amount: {
    color: darkYellow
  },
  family: {
    fontFamily: poppinsBoldText,
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  amountContainer: {
    textAlignVertical: 'center',
    marginTop: 8
  },
  viewMoreContainer: {
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    borderRadius: 50,
    borderColor: gainsboro
  },
  viewMore: {
    color: grey20,
    fontSize: 12,
    fontWeight: '500'
  }
})
