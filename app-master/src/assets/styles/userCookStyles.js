import { StyleSheet } from 'react-native'
import {
  greyBlue,
  darkCyan,
  balckBean,
  darkBlack,
  mischka,
  darkYellow,
  firefly,
  elephant,
  white
} from './colors'
import {
  poppinsMedium,
  nunitoSansRegular,
  robotoRegular,
  poppinSemiBold,
  nunitoSemiBold,
  poppinsBoldText,
  robotoMedium
} from './fonts'

export const userCookStyles = StyleSheet.create({
  cookGenderImg: {
    height: 30,
    width: 30,
    resizeMode: 'stretch'
  },
  cookDetailsCOntainer: {
    marginVertical: 25,
    marginHorizontal: 10,
    backgroundColor: greyBlue,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    paddingHorizontal: 20
  },
  userNameText: {
    fontFamily: poppinSemiBold,
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 20,
    alignSelf: 'flex-start'
  },
  starRatingImg: {
    height: 25,
    width: 25,
    resizeMode: 'stretch'
  },
  flexDirectionStyle: {
    flexDirection: 'row'
  },
  ratingContainer: {
    paddingTop: 2
  },
  ratingText: {
    color: balckBean,
    fontSize: 18,
    fontFamily: nunitoSansRegular,
    paddingLeft: 10
  },
  descriptionContainer: {
    marginHorizontal: 25
  },
  descriptionTextContainer: {
    marginVertical: 15,
    marginHorizontal: 10,
    backgroundColor: greyBlue,
    padding: 10,
    borderRadius: 15
  },
  descriptionTitleText: {
    color: darkCyan,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: nunitoSemiBold
  },
  descriptionText: {
    fontFamily: robotoRegular,
    fontSize: 12,
    color: darkBlack,
    paddingLeft: 5
  },
  cuisinesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  cuisinesContainerText: {
    backgroundColor: mischka,
    paddingHorizontal: 25,
    paddingVertical: 5,
    margin: 10,
    alignItems: 'center',
    borderRadius: 15,
    fontFamily: poppinsBoldText,
    fontSize: 12,
    color: darkCyan
  },
  foodTypeImg: {
    height: 35,
    width: 35,
    resizeMode: 'stretch',
    alignSelf: 'center'
  },
  foodTypeText: {
    fontFamily: poppinsMedium,
    fontSize: 10,
    color: darkCyan,
    paddingHorizontal: 40,
    paddingVertical: 10
  },
  pb: {
    paddingBottom: 120
  },
  bookNowContainer: {
    backgroundColor: elephant,
    paddingVertical: 15,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderRadius: 15,
    alignItems: 'center'
  },
  bookNowText: {
    backgroundColor: darkYellow,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    fontFamily: robotoMedium,
    fontSize: 14,
    color: firefly,
    overflow: 'hidden'
  },
  ratingContainerDetails: {
    backgroundColor: white,
    position: 'relative',
    borderRadius: 30,
    padding: 20,
    overflow: 'hidden',
    bottom: 21,
    flex: 1
  }
})
