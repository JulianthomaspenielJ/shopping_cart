import { StyleSheet } from 'react-native'
import {
  transparent,
  transparentOpacity,
  white,
  graniteGray,
  grey,
  grey20,
  dangerText,
  paleSky,
  darkCyan,
  darkYellow,
  balckBean
} from './colors'
import {
  medium,
  poppinsMedium,
  robotoBlack,
  nunitoSansRegular,
  poppinsBoldText,
  nunitoSansBold
} from './fonts'

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 30
  },
  summary: {
    flex: 1,
    backgroundColor: transparent,
    borderRadius: 13
  },
  banner: {
    width: '100%',
    height: 150
  },
  bannerStyle: {
    borderRadius: 13
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  bannerInfo: {
    backgroundColor: transparentOpacity,
    flexDirection: 'row',
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13
  },
  orderContainer: {
    width: '50%',
    justifyContent: 'center',
    paddingHorizontal: 12
  },
  orderId: {
    color: white,
    fontSize: 12,
    fontFamily: medium,
    fontWeight: '500',
    lineHeight: 41
  },
  orderTimeContainer: {
    width: '50%',
    justifyContent: 'center'
  },
  timeHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '47%'
  },
  icon: {
    width: 10,
    height: 10
  },
  orderTime: {
    color: white,
    fontSize: 10,
    lineHeight: 17,
    paddingLeft: 10
  },
  details: {
    paddingTop: 5,
    paddingBottom: 20,
    marginHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: grey
  },
  detailText: {
    color: paleSky,
    fontSize: 14,
    fontFamily: poppinsMedium,
    fontWeight: '600',
    lineHeight: 25
  },
  cancelOrder: {
    color: dangerText,
    textAlign: 'right',
    paddingTop: 15
  },
  addContainer: {
    paddingVertical: 15,
    marginHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: grey
  },
  addTitle: {
    fontSize: 14,
    color: grey20,
    fontFamily: medium,
    fontWeight: '500',
    lineHeight: 15
  },
  checkboxHolder: {
    paddingVertical: 15
  },
  checkbox: {
    paddingVertical: 10
  },
  checkboxTot: {
    paddingVertical: 6
  },
  addDetailHolder: {
    flexDirection: 'row',
    paddingVertical: 5
  },
  addLabel: {
    width: '50%',
    color: graniteGray
  },
  addPriceLabel: {
    width: '50%',
    textAlign: 'right',
    color: graniteGray
  },
  priceContainer: {
    paddingVertical: 8,
    paddingHorizontal: 15
  },
  priceContainerSec: {
    paddingVertical: 4,
    paddingHorizontal: 15
  },
  totalHolder: {
    flexDirection: 'row'
  },
  priceLabel: {
    width: '50%',
    fontFamily: poppinsBoldText,
    color: balckBean,
    fontSize: 16,
    fontWeight: '500'
  },
  priceLabelOther: {
    width: '100%',
    fontFamily: nunitoSansRegular,
    color: balckBean,
    fontSize: 14,
    fontWeight: 'normal'
  },
  checkout: {
    backgroundColor: darkYellow,
    width: '88%',
    padding: 10,
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    overflow: 'hidden'
  },
  priceTotal: {
    width: '50%',
    textAlign: 'right',
    fontFamily: nunitoSansBold,
    fontWeight: '500',
    fontSize: 17,
    color: balckBean
  },
  priceTotalOther: {
    width: '100%',
    textAlign: 'right',
    fontFamily: nunitoSansRegular,
    fontSize: 14,
    color: balckBean,
    fontWeight: '400'
  },
  btnHolder: {
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 23
  },
  detailCookHolder: {
    flexDirection: 'row'
  },
  callHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  ratingContent: {
    paddingVertical: 20
  },
  rateTitle: {
    fontSize: 16,
    color: grey20,
    fontFamily: medium,
    fontWeight: '700',
    lineHeight: 15,
    padding: 5
  },
  ratingHolder: {
    alignItems: 'flex-start',
    paddingVertical: 10
  },
  comment: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    fontSize: 14,
    color: grey20,
    fontFamily: medium,
    fontWeight: '500',
    lineHeight: 15
  },
  checkoutDataText: {
    color: darkCyan,
    fontFamily: nunitoSansRegular,
    fontWeight: 'bold'
  },
  checkooutBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: '50%'
  },
  checkoutBtnColor: {
    fontFamily: robotoBlack,
    color: darkCyan,
    fontSize: 16,
    fontWeight: '500'
  },
  couponsapply: {
    backgroundColor: '#8E98AE',
    color: '#F8F8F8',
    margin: 16,
    fontFamily: poppinsMedium,
    textAlign: 'center',
    fontSize: 16
  },
  couponErr: {
    fontFamily: nunitoSansBold,
    color: '#D92727',
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  couponsSec: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    backgroundColor: '#8E98AE',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    textAlign: 'center'
  },
  couponstext: {
    fontSize: 14,
    width: '100%',
    textAlign: 'left',
    fontFamily: poppinsMedium,
    color: '#6E767E'
  },
  checkboxLabel: {
    paddingLeft: 10,
    fontSize: 14,
    color: darkCyan,
    fontFamily: poppinsMedium,
    fontWeight: '500'
  },
  coupon: {
    borderRadius: 20,
    paddingLeft: 30,
    top: 20,
    marginBottom: 20,
    backgroundColor: '#EBEDF2'
  },
  addaddress: {
    padding: 8,
    textAlign: 'right',
    color: 'white',
    fontSize: 12,
    fontFamily: poppinsMedium
  }
})
