import { StyleSheet, Platform } from 'react-native'
import {
  black,
  white,
  cyan,
  athensGrey,
  darkYellow,
  carnation,
  athensGrey2,
  blueberry,
  paleSky,
  amethyst,
  dandelion,
  tan,
  greyBlue,
  hummingBird,
  balckBean,
  dangerText
} from './colors'
import {
  nunitoSemiBold,
  nunitoRegular,
  nunitoLight,
  nunitoBold,
  poppinsBoldText,
  medium,
  poppinsMedium,
  robotoRegular,
  robotoMedium,
  poppinSemiBold,
  poppinsExtra
} from './fonts'

export const supportMenu = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: white
  },
  arrowBack: {
    padding: 3,
    fontWeight: 'bold'
  },
  customerSupportText: {
    color: black,
    fontFamily: nunitoSemiBold,
    fontSize: 24,
    marginVertical: 10
  },
  customerSupportParagraph: {
    color: black,
    fontFamily: nunitoRegular,
    fontSize: 18,
    marginVertical: 10,
    lineHeight: 30
  },
  borderLine: {
    borderWidth: 0.5,
    borderColor: cyan,
    width: '90%',
    height: 1.5
  },
  titleText: {
    color: black,
    fontFamily: nunitoLight,
    fontSize: 18,
    paddingVertical: 20
  },
  emergencytext: {
    color: '#E73131',
    fontSize: 20,
    fontFamily: poppinsBoldText
  },
  troubleshootTitleText: {
    fontFamily: nunitoBold,
    fontSize: 13
  },
  troubleShootContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    backgroundColor: white,
    borderRadius: 15,
    justifyContent: 'center',
    marginVertical: 15
  },
  troubleShootDescriptionContainer: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: athensGrey,
    borderRadius: 25
  },
  troubleShootDescriptionContainerText: {
    fontFamily: nunitoRegular,
    fontSize: 13,
    lineHeight: 18
  },
  welcomeText: {
    fontFamily: poppinsBoldText,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 27
  },
  toAppText: {
    fontFamily: medium,
    fontSize: 18,
    paddingLeft: 5,
    textTransform: 'capitalize'
  },
  question: {
    fontFamily: poppinsMedium,
    fontSize: 14
  },
  textInput: {
    paddingLeft: 18,
    fontSize: 16,
    backgroundColor: white,
    color: black,
    fontFamily: robotoRegular,
    borderRadius: 15,
    marginTop: 10,
    textAlignVertical: 'top',
    minHeight: 100
  },
  submitText: {
    fontFamily: robotoMedium,
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 30,
    width: '100%',
    paddingVertical: 20,
    backgroundColor: darkYellow,
    marginTop: 30,
    borderRadius: 15,
    textAlign: 'center',
    overflow: 'hidden'
  },
  borderRad: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  bglogo: {
    height: 110,
    width: 120,
    resizeMode: 'contain'
  },
  copyright: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    marginRight: 10
  },
  emergencySec: {
    flexDirection: 'row',
    padding: 25,
    width: '100%',
    alignSelf: 'center'
  },
  inside: {
    fontSize: 14,
    paddingTop: 5,
    alignSelf: 'flex-start',
    fontFamily: poppinsExtra
  },
  phone: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  socialLink: {
    fontFamily: medium,
    fontSize: 14,
    fontWeight: '500'
  },
  copyrightText: {
    fontFamily: medium,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
    width: '95%'
  },
  emergencyText: {
    fontSize: 14,
    fontFamily: poppinsExtra,
    color: black,
    lineHeight: 20,
    width: '95%'
  },
  closeIcon: {
    backgroundColor: carnation,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 8,
    paddingLeft: 8,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    borderRadius: 13,
    fontSize: 24,
    color: white,
    position: 'relative',
    right: 30,
    zIndex: 2,
    top: 15,
    overflow: 'hidden',
    padding: 4
  },
  alertTitleText: {
    fontFamily: nunitoSemiBold,
    fontSize: 18,
    fontWeight: '600',
    color: black
  },
  orderIconStyle: {
    height: 22,
    width: 22,
    resizeMode: 'contain'
  },
  orderContainer: {
    backgroundColor: athensGrey2,
    borderRadius: 15,
    marginVertical: 25,
    padding: 10,
    flexDirection: 'row'
  },
  orderImageView: {
    backgroundColor: blueberry,
    padding: 10,
    width: '13%',
    borderRadius: 8
  },
  ordersText: {
    paddingLeft: 15
  },
  orderIdText: {
    fontFamily: nunitoBold,
    fontSize: 14,
    lineHeight: 19,
    color: black
  },
  orderText: {
    fontFamily: poppinsMedium,
    fontSize: 12,
    lineHeight: 19,
    color: paleSky
  },
  ordersIconContainer: {
    backgroundColor: amethyst,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15
  },
  arrowDown: {
    color: white
  },
  actionBtn: {
    backgroundColor: dandelion,
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 15,
    fontFamily: poppinSemiBold,
    fontSize: 13,
    fontWeight: '600',
    overflow: 'hidden'
  },
  tanBack: {
    backgroundColor: tan
  },
  commentsText: {
    fontFamily: nunitoSemiBold,
    fontSize: 14,
    fontWeight: '600'
  },
  commentsInput: {
    backgroundColor: greyBlue,
    marginBottom: 20,
    minHeight: 100
  },
  hummingBack: {
    backgroundColor: hummingBird
  },
  priceLabel: {
    width: '50%',
    fontFamily: poppinsBoldText,
    color: balckBean,
    fontSize: 14,
    fontWeight: '500'
  },
  priceTotal: {
    width: '50%',
    textAlign: 'right',
    fontFamily: poppinsBoldText,
    fontWeight: '500',
    fontSize: 15,
    color: balckBean
  },
  priceContainer: {
    paddingVertical: 8,
    paddingHorizontal: 2,
    paddingBottom: 0, 
    paddingTop: 2
  },
  loginText: {
    fontFamily: poppinsBoldText,
    fontWeight: '500',
  },
  errorMsgText: {
    color: dangerText,
    fontSize: 12
  }
})
