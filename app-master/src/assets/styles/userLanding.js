import { StyleSheet, Platform } from 'react-native'
import {
  white,
  tangerine,
  darkGrey,
  black,
  lightGrey,
  darkBlack,
  darkCyan,
  blueCyan,
  bluemagneta,
  shadeCyan,
  sapphire,
  denim,
  outrageousOrange,
  mischka
} from './colors'
import {
  light,
  poppinsMedium,
  nunitoSansRegular,
  RobotoLight,
  rubikOneRegular,
  rubikBold,
  nunitoSansBold,
  gilroyExtrabold,
  poppinsLight,
  nunitoBold
} from './fonts'

export const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: lightGrey
  },
  titleContainer: {
    flex: 1
  },
  parentContainer: {
    backgroundColor: lightGrey,
    paddingTop: 20
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  hederSec: {
    flex: 1,
    flexDirection: 'row'
  },
  locationImg: {
    width: 16,
    height: 22,
    justifyContent: 'flex-start'
  },
  tabContainer: {
    paddingTop: 20
  },
  locationDesc: {
    textAlign: 'left',
    fontFamily: poppinsMedium,
    paddingLeft: 10,
    fontSize: 12,
    width: '85%'
  },
  menuImg: {
    width: 26,
    height: 14,
    resizeMode: 'contain'
  },
  searchContainer: {
    padding: 20,
    textAlign: 'center',
    backgroundColor: lightGrey
  },
  searchSec: {
    backgroundColor: white,
    flexDirection: 'row',
    padding: 4,
    alignItems: 'center',
    borderRadius: 18,
    overflow: 'hidden',
    height: 60,
    paddingBottom: 0,
    paddingTop: 0,
    borderWidth: 0.75,
    borderColor: 'rgba(0, 0, 0, 0.07)'
  },
  seeall: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 15
  },
  seeAllCon: {
    backgroundColor: shadeCyan,
    borderRadius: 13,
    paddingHorizontal: 8,
    height: 35,
    textAlign: 'right',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  seeallText: {
    color: white
  },
  imageBg: {
    width: 120,
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
    alignItems: 'center',
    flex: 1
  },
  searchIcon: {
    paddingVertical: Platform.OS === 'ios' ? 10 : 13,
    paddingHorizontal: 17,
    borderRadius: 18,
    overflow: 'hidden',
    // marginLeft: 15,
    alignSelf: 'flex-end',
    backgroundColor: sapphire,
    color: white,
    fontSize: 30
  },
  closeIcon: {
    paddingTop: 4,
    fontSize: 32,
    color: black,
    right: 15
  },
  seachSection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: mischka,
    borderRadius: 20,
    // marginRight: 20,
    marginVertical: 10,
    marginHorizontal: 12
    // alignSelf: 'flex-end'
  },
  searchInput: {
    fontSize: 14,
    paddingLeft: 15,
    width: '80%',
    fontFamily: RobotoLight
  },
  allContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    paddingHorizontal: 10,
    marginBottom: 10
  },
  imageSec: {
    width: 210,
    height: 230,
    borderRadius: 25,
    bottom: 0,
    overflow: 'hidden'
  },
  imageOpacity: {
    flex: 1,
    marginBottom: 60
  },
  cookDetails: {
    flex: 1,
    opacity: 1,
    paddingLeft: 25,
    paddingTop: 10,
    backgroundColor: darkGrey,
    resizeMode: 'contain'
  },
  cuisineCont: {
    paddingHorizontal: 10
  },
  cuisineImages: {
    borderRadius: 25,
    overflow: 'hidden'
  },
  section: {
    flex: 1,
    paddingBottom: 15,
    paddingLeft: 18
  },
  allsection: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  cuisineHeight: {
    width: 260,
    height: 130
  },
  chefHeight: {
    width: 180,
    height: 150
  },
  cuisineBg: {
    flex: 1,
    marginBottom: 50
  },
  cooksBg: {
    flex: 1,
    marginBottom: 20
  },
  cuisinesDetails: {
    flex: 1,
    opacity: 0.75,
    paddingLeft: 20,
    paddingTop: 10,
    backgroundColor: darkGrey
  },
  cuisinesDetailsAll: {
    alignItems: 'center',
    opacity: 0.6
  },
  itemImg: {
    width: '100%',
    height: 300,
    position: 'absolute'
  },
  itemImgBg: {
    position: 'absolute',
    marginBottom: 10,
    height: 292,
    opacity: 0.4,
    backgroundColor: black
  },
  flatList: {
    paddingLeft: 10
  },
  searchflatList: {
    paddingBottom: 180
  },
  nameText: {
    color: white,
    fontSize: 18,
    fontFamily: rubikOneRegular,
    textTransform: 'capitalize',
    fontWeight: '600'
  },
  cuisinesText: {
    fontFamily: nunitoSansRegular,
    fontSize: 12,
    textTransform: 'capitalize',
    fontWeight: '600',
    color: white,
    width: 150,
    height: 20,
    paddingTop: 4
  },
  cooknameText: {
    fontFamily: poppinsMedium,
    fontWeight: '600',
    fontSize: 16
  },
  nameTextsmall: {
    fontSize: 12,
    color: white,
    fontFamily: poppinsMedium,
    fontWeight: '300'
  },
  descText: {
    color: white,
    fontSize: 13,
    paddingTop: 10,
    fontFamily: light,
    fontWeight: '300'
  },
  serachContainer: {
    ...Platform.select({
      ios: {
        margin: 15
      }
    })
  },
  searchdescTitle: {
    color: darkCyan,
    fontFamily: RobotoLight,
    fontSize: 12
  },
  searchdescText: {
    color: darkBlack,
    fontFamily: RobotoLight,
    fontSize: 12,
    paddingTop: 6,
    lineHeight: 14
  },
  chefName: {
    color: blueCyan,
    fontFamily: gilroyExtrabold,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  location: {
    color: darkCyan,
    fontFamily: poppinsMedium,
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize'
  },
  locationText: {
    color: darkCyan,
    fontFamily: poppinsLight,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  orderval: {
    textAlignVertical: 'center',
    ...Platform.select({
      ios: {
        // paddingTop: 8
      }
    })
  },
  searchHeader: {
    paddingLeft: 30,
    paddingRight: 30
  },
  bellicon: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  arrowIcon: {
    fontFamily: RobotoLight,
    color: black
  },
  handImage: {
    height: 20,
    width: 20
  },
  ordessec: {
    lineHeight: 16,
    fontSize: 12
  },
  descTextSmall: {
    color: white,
    fontSize: 10,
    paddingTop: 5,
    fontFamily: light
  },
  titleHeader: {
    fontFamily: poppinsMedium,
    fontSize: 16
  },
  TouchableOpacityStyle: {
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 90,
    right: 0
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 100,
    height: 100
  },
  Tabcontainer: {
    backgroundColor: tangerine,
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33
  },
  starRating: {
    width: 15,
    height: 15,
    marginTop: 4,
    marginRight: 10
  },
  starRatingSmall: {
    width: 8,
    height: 8
  },

  starRatingText: {
    fontSize: 12,
    paddingLeft: 3,
    color: 'rgba(35, 34, 33, 0.99)',
    fontFamily: nunitoSansRegular,
    fontWeight: '400',
    position: 'relative'
  },
  starRatingTextVal: {
    paddingTop: 2,
    fontSize: 13
  },
  starRatingTextSmall: {
    fontSize: 10
  },
  starRatingContainer: {
    flexDirection: 'row',
    paddingTop: 4
  },
  ratingContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: bluemagneta,
    borderRadius: 25,
    width: 35,
    alignItems: 'center'
  },
  starRatingContainerSmall: {
    paddingTop: 10
  },
  noRecords: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30
  },
  cuisineImg: {
    height: 180,
    resizeMode: 'stretch'
  },
  cuisineBGSec: {
    flex: 1,
    paddingTop: 20,
    paddingRight: 10,
    alignItems: 'flex-end'
  },
  cuisineBgImage: {
    height: 110,
    width: 110,
    resizeMode: 'contain'
  },
  bannerBackgroundContainer: {
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 300
  },
  bannerBackgroundImage: {
    height: 170,
    width: 370,
    resizeMode: 'stretch'
  },
  bannerChefImg: {
    height: 150,
    width: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20
  },
  bannerTextContainer: {
    paddingLeft: 20,
    paddingVertical: 30,
    width: '51%'
  },
  bannerText: {
    color: white,
    fontFamily: rubikBold,
    fontSize: 22,
    paddingLeft: 5
  },
  bannerSeeAll: {
    flexDirection: 'row',
    backgroundColor: denim,
    width: 80,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 5,
    marginTop: 18,
    paddingVertical: 5,
    justifyContent: 'center'
  },
  bannerSeeAllText: {
    color: white,
    fontFamily: nunitoSansBold,
    fontSize: 11,
    alignSelf: 'center'
  },
  arrowHolder: {
    backgroundColor: outrageousOrange,
    borderRadius: 10,
    alignItems: 'flex-end',
    padding: 10,
    marginVertical: 16
  },
  detailArrowIcon: {
    fontFamily: RobotoLight,
    color: white
  },
  cuisineHeightSeeAll: {
    width: 340,
    height: 160,
    alignItems: 'center',
    marginBottom: 20
  },
  cuisineListImg: {
    height: 140,
    width: 340
  },
  bookingTitle: {
    paddingHorizontal: 30,
    paddingVertical: 20
  },
  bookingTitleText: {
    fontSize: 24,
    fontFamily: nunitoBold
  }
})
