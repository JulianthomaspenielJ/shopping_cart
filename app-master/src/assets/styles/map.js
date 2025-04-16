import { StyleSheet } from 'react-native'
import { tangerine, borderColor, black, spanishGray, searchIconColor, grey44, white, transparent, grey20, vividTangelo, gainsboro } from './colors'
import { medium, nunitoSansSemiBold } from './fonts'

export const styles = StyleSheet.create({
  bgColor: {
    flex: 1,
    backgroundColor: white
  },
  locationContainer: {
    flex: 1,
    backgroundColor: white
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: transparent,
    opacity: 0.6,
    paddingLeft: 10,
    paddingTop: 10,
    resizeMode: 'contain'
  },
  container: {
    backgroundColor: white,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  map: {
    flex: 1
  },
  searchContainer: {
    padding: 20,
    textAlign: 'center',
    flex: 1
  },
  searchSec: {
    // borderRadius: 25,
    // overflow: 'hidden',
    // height: 50,
    backgroundColor: searchIconColor
    // flexDirection: 'row',
    // padding: 5,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  searchIcon: {
    paddingLeft: 30,
    color: spanishGray,
    fontSize: 20,
    paddingTop: 14
  },
  backBtnContainer: {
    // flex: 1,
    padding: 20
    // flexDirection: 'row'
    // backgroundColor: grey44,
    // opacity: 1
  },
  backBtnContainerOther: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'flex-end'
  },
  backBtn: {
    height: 20,
    width: 20
  },
  gpsBtn: {
    height: 25,
    width: 25
  },
  title: {
    fontFamily: medium,
    color: black,
    fontSize: 15
  },
  addressForms: {
    flex: 2,
    padding: 20
  },
  searchInput: {
    fontSize: 12,
    paddingLeft: 15,
    width: '100%'
  },
  titleContainer: {
    flex: 1
  },
  parentContainer: {
    backgroundColor: white,
    paddingTop: 20
  },
  addressContainer: {
    paddingTop: 10
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  defaultContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  addContainer: {
    paddingBottom: 20
  },
  gpsheaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
    paddingTop: 40
  },
  label: {
    paddingTop: 20,
    paddingBottom: 20,
    fontWeight: '500',
    fontFamily: medium,
    fontSize: 14,
    color: grey20
  },
  addLabel: {
    paddingTop: 4,
    paddingBottom: 2
  },
  gpsContent: {
    flex: 1,
    paddingLeft: 15
  },
  parentaddContainer: {
    flex: 1,
    backgroundColor: white,
    paddingTop: 10
  },
  headeraddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  locationImg: {
    width: 16,
    height: 22,
    justifyContent: 'flex-start'
  },
  locationIcon: {
    fontSize: 24,
    color: tangerine
  },
  locationIconOther: {
    fontSize: 26,
    color: grey20
  },
  mapIcon: {
    width: 40,
    height: 40
  },
  locationDesc: {
    paddingLeft: 16,
    fontFamily: nunitoSansSemiBold,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    color: grey20
  },
  details: {
    fontSize: 11,
    marginBottom: 0,
    color: vividTangelo,
    fontFamily: medium
  },
  headline: {
    fontSize: 16,
    color: vividTangelo,
    fontFamily: medium
  },
  addBtn: {
    fontSize: 12
  },
  locationDescOther: {
    fontFamily: nunitoSansSemiBold,
    fontSize: 14,
    alignItems: 'center',
    lineHeight: 22
    // width: '75%'
  },
  defaultAdd: {
    fontSize: 12,
    position: 'absolute',
    right: 0,
    bottom: 5
  },
  linerText: {
    alignItems: 'center',
    borderRadius: 33,
    padding: 10,
    marginTop: 15,
    marginHorizontal: 15
  },
  btnText: {
    color: white,
    fontFamily: medium,
    fontWeight: '600',
    fontSize: 18
  },
  btnContainer: {
    paddingTop: 10
  },
  addressInput: {
    fontSize: 13,
    paddingLeft: 15,
    width: '100%',
    padding: 10,
    borderBottomWidth: 0.3,
    fontFamily: medium,
    borderBottomColor: gainsboro
  },
  setLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 5,
    paddingLeft: 30
  },
  setLocationBtn: {
    width: 70,
    borderRadius: 25,
    borderColor: borderColor,
    borderWidth: 1,
    alignItems: 'center',
    marginRight: 18
  },
  setLocationTxt: {
    padding: 4,
    color: grey44,
    fontSize: 12,
    fontFamily: nunitoSansSemiBold
  },
  arrowBack: {
    padding: 3,
    fontWeight: 'bold'
  }
})
