import { StyleSheet } from 'react-native'
import {
  darkCyan,
  white,
  mojo,
  paleSky,
  balckBean,
  darkYellow,
  dangerText,
  gainsboro,
  blueBgCOlor,
  malibu,
  mischka
} from './colors'
import {
  poppinsMedium,
  robotoBlack,
  rubikRegular,
  gilroyExtrabold,
  nunitoSansSemiBold,
  poppinsBold
} from './fonts'

export const ratingDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  bgImageContainer: {
    width: '100%',
    resizeMode: 'contain',
    backgroundColor: darkCyan,
    opacity: 1,
    flex: 0.5,
    position: 'relative'
  },
  backArrowImage: {
    width: 15,
    height: 20,
    resizeMode: 'stretch',
    marginTop: 30,
    marginHorizontal: 15
  },
  ratingContainer: {
    backgroundColor: white,
    position: 'relative',
    borderRadius: 30,
    padding: 10,
    overflow: 'hidden',
    bottom: '2.6%',
    flex: 1
  },
  borderPatch: {
    borderWidth: 4,
    borderColor: 'rgba(46, 89, 95, 0.4)',
    width: '15%',
    height: 4,
    borderRadius: 5,
    alignSelf: 'center'
  },
  titleText: {
    padding: 15,
    fontFamily: poppinsMedium,
    fontSize: 18,
    fontWeight: '600'
  },
  cookDetailsContainer: {
    backgroundColor: blueBgCOlor,
    borderRadius: 20,
    padding: 18
  },
  cookDetailsContainerTot: {
    backgroundColor: blueBgCOlor,
    borderRadius: 20,
    padding: 18,
    paddingTop: 10,
    paddingBottom: 10
  },
  cookAvatar: {
    width: 50,
    height: 35,
    resizeMode: 'contain'
  },
  cookPersonal: {
    flexDirection: 'row',
    paddingTop: 4
  },
  name: {
    color: darkCyan,
    fontFamily: gilroyExtrabold,
    fontSize: 16,
    lineHeight: 20,
    textTransform: 'capitalize',
    paddingLeft: 10
  },
  imagess: {
    height: 41,
    width: 41,
    resizeMode: 'contain',
    borderRadius: 13
  },
  status: {
    alignSelf: 'flex-end',
    color: mojo,
    fontFamily: nunitoSansSemiBold,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    lineHeight: 20
  },
  country: {
    color: darkCyan,
    fontSize: 12
  },
  orderIdText: {
    color: paleSky,
    fontFamily: nunitoSansSemiBold,
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16
  },
  cookCuisines: {
    color: paleSky,
    fontFamily: nunitoSansSemiBold,
    fontSize: 12,
    fontWeight: 'bold',
    width: 60,
    textAlign: 'right'
  },
  cookCuisineDetails: {
    color: darkCyan,
    fontFamily: nunitoSansSemiBold,
    fontSize: 12,
    fontWeight: 'bold',
    paddingLeft: 5
  },
  ellips: {
    width: 90
  },
  cookContainerLine: {
    marginLeft: 26,
    marginTop: 13,
    borderLeftColor: darkCyan,
    borderLeftWidth: 1,
    paddingLeft: 8
  },
  flexDirectionStyle: {
    flexDirection: 'row'
  },
  totalText: {
    color: balckBean,
    fontFamily: poppinsBold,
    fontSize: 14,
    fontWeight: 'bold'
  },
  orderNumber: {
    color: darkCyan,
    fontFamily: nunitoSansSemiBold,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 16
  },
  ratingText: {
    color: balckBean,
    fontFamily: robotoBlack,
    fontSize: 18,
    fontWeight: '500',
    marginTop: 7
  },
  input: {
    margin: 15,
    height: 50
  },
  maxWordCount: {
    alignSelf: 'flex-end',
    padding: 15,
    fontFamily: rubikRegular,
    fontWeight: '100',
    fontSize: 12
  },
  submitText: {
    backgroundColor: darkYellow,
    width: '80%',
    padding: 15,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: poppinsMedium,
    fontWeight: '600',
    fontSize: 14
  },
  submitRatings: {
    marginVertical: 25
  },
  errMsg: {
    color: dangerText,
    fontSize: 10,
    paddingLeft: 15
  },
  checkoutImg: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    // borderRadius: 15
  },
  largeimage: {
    width: 45,
    height: 45
  },
  detailsText: {
    paddingLeft: 15
  },
  underline: {
    backgroundColor: gainsboro,
    height: 1,
    width: '50%',
    alignSelf: 'center'
  },
  imageActive: {
    backgroundColor: malibu,
  },
  imageInActive: {
    backgroundColor: mischka
  },
})
