import { StyleSheet, Platform } from 'react-native'
import {
  grey20,
  white,
  transparentOpacity,
  blueCyan,
  greyBlue,
  curiousBlue,
  denim,
  darkYellow,
  jacksonsPurple
} from './colors'
import {
  medium,
  semiBold,
  nunitoSans,
  robotoMedium,
  nunitoSansBold,
  poppinsMedium
} from './fonts'

export const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  Content: {
    backgroundColor: greyBlue,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        margin: 15
      }
    })
  },
  bookItem: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    padding: 15
  },
  bookDetail: {
    width: '40%'
  },
  detailInner: {
    flex: 1
  },
  detailTitle: {
    fontSize: 16,
    fontFamily: nunitoSans,
    fontWeight: 'bold',
    color: blueCyan,
    paddingBottom: 5,
    paddingHorizontal: 10
  },
  detailTimeSec: {
    backgroundColor: transparentOpacity,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    overflow: 'hidden'
  },
  detailTime: {
    textAlign: 'center',
    color: white,
    fontSize: 12,
    fontFamily: medium,
    paddingVertical: 5,
    fontWeight: '500'
  },
  bgImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch'
  },
  bgImageStyle: {
    borderRadius: 18
  },
  bookControl: {
    flex: 1,
    padding: 5
  },
  radioHolder: {
    paddingVertical: 5
  },
  peopleHolder: {
    flexDirection: 'row',
    marginHorizontal: 15,
    alignItems: 'center'
  },
  peopleLabel: {
    color: grey20,
    fontFamily: robotoMedium,
    fontWeight: '500',
    fontSize: 12,
    paddingRight: 25
  },
  btnPpl: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: white,
    fontFamily: semiBold,
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden'
  },
  btnDecr: {
    borderRadius: 5,
    backgroundColor: curiousBlue
  },
  btnIncr: {
    borderRadius: 5,
    backgroundColor: jacksonsPurple
  },
  pplCount: {
    fontSize: 13,
    fontFamily: poppinsMedium,
    fontWeight: '500',
    color: grey20,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  btnBookNow: {
    borderRadius: 33,
    paddingVertical: 7
  },
  btnLabel: {
    textAlign: 'center',
    color: white,
    fontFamily: medium,
    fontSize: 14,
    fontWeight: '500'
  },
  bookNowButton: {
    paddingHorizontal: 10
  },
  bookNow: {
    backgroundColor: denim,
    width: '100%',
    paddingVertical: 15,
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 10
  },
  bookNowText: {
    color: white,
    fontFamily: nunitoSansBold,
    fontWeight: '600',
    alignSelf: 'center'
  },
  slotTime: {
    backgroundColor: darkYellow,
    width: '33%',
    borderRadius: 10,
    padding: 5,
    marginVertical: 15,
    marginLeft: 5
  },
  slotTimeText: {
    fontFamily: poppinsMedium,
    fontSize: 10,
    alignItems: 'center',
    textAlignVertical: 'center'
  },
  dropdownContainer: {
    flexDirection: 'row',
    backgroundColor: greyBlue,
    borderRadius: 15,
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 20,
    top: 15
  },
  imageCuisine: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
    alignSelf: 'center'
  },
  dropdownLable: {
    paddingLeft: 15,
    fontFamily: robotoMedium,
    fontWeight: '500'
  },
  slotTimeContainer: {
    backgroundColor: denim,
    width: '33%',
    borderRadius: 10,
    padding: 5,
    marginVertical: 15,
    marginLeft: 5
  }
})
