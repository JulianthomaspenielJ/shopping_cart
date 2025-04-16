import { StyleSheet, Platform } from 'react-native'
import { corn, Wattle, black, white, grey20, gainsboro, graniteGray, darkYellow, bigStone } from './colors'
import { medium, poppinsBoldText, RobotoLight, robotoBlack, poppinsMedium, poppinsBold, poppinsLight, robotoRegular, nunitoBold } from './fonts'

export const customerWallet = StyleSheet.create({
  mainContainerFluid: {
    flex: 1,
    backgroundColor: white
  },
  mainContainer: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 15,
    paddingTop: 0
  },
  walletBgImage: {
    width: '100%',
    height: 110,
    borderRadius: 100,
    alignSelf: 'center'
  },
  walletBgImageContainer: {
    padding: 25,
    backgroundColor: '#280F34', 
    borderRadius: 25
  },
  rupeeContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  icon: {
    paddingTop: 5,
    paddingRight: 5
  },
  iconText: {
    fontFamily: poppinsLight,
    fontSize: 18,
    fontWeight: '900',
    color: '#7C8AAB' 
  },
  balanceText: {
    fontFamily: poppinsMedium,
    fontWeight: '400',
    color: '#FFFFFF', 
    fontSize: 20, 
    marginTop: 0
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
    color: black,
    fontFamily: nunitoBold,
    fontSize: 14,
    fontWeight: '600'
  },
  walletImg: {
    height: 30,
    width: 30,
    resizeMode: 'stretch'
  },
  transactionContainer: {
    borderWidth: 0,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 0
  },
  transactionText: {
    color: black,
    fontFamily: medium,
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'left'
  },
  transactionDateContainer: {
    padding: 8
  },
  dateText: {
    color: '#615C7E',
    fontFamily: medium,
    fontWeight: '400',
    fontSize: 11,
    textAlign: 'left'
  },
  rupeeIcon: {
    paddingTop: Platform.OS === 'ios' ? 3 : 6,
    paddingRight: 3
  },
  amount: {
    fontSize: 18
  },
  family: {
    fontFamily: robotoBlack,
    fontWeight: '600',
    textTransform: 'capitalize',
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
  },
  hederSec: {
    flex: 1,
    flexDirection: 'row'
  },
  arrowIcon: {
    fontFamily: RobotoLight,
    color: bigStone, 
    fontWeight: 'bold'
  },
  title: {
    textAlign: 'center', 
    paddingLeft: 10,
    fontSize: 18,
    width: '85%',
    fontFamily: nunitoBold
  },
  borderLayer: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    width: '75%',
    marginVertical: 5,
    alignSelf: 'center'    
  },
  addmoney: {
    padding: 12,
    fontFamily: medium,
    color: white,
    fontSize: 12
  },
  month: {
    fontFamily: robotoRegular,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  menuImg: {
    width: 26,
    height: 14,
    resizeMode: 'contain'
  }
})
