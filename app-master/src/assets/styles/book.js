import { StyleSheet, Platform } from 'react-native'
import {
  corn,
  cloudBurst,
  brightOrange,
  transparent,
  spanishGray,
  white,
  dangerText,
  black,
  mischka,
  malibu,
  elephant,
  darkCyan,
  cyanBlack
} from './colors'
import { medium, semiBold, arial, poppinsBold, nunitoSansSemiBold } from './fonts'

export const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  Content: {
    ...Platform.select({
      ios: {
        padding: 18
      }
    })
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 22
  },
  cardTitleHolder: {
    flex: 1,
    justifyContent: 'center'
  },
  cardTitle: {
    color: black,
    fontWeight: '600',
    fontSize: 18,
    fontFamily: nunitoSansSemiBold,
    paddingLeft: 15
  },
  cardTitleImg: {
    alignSelf: 'center',
    left: 5,
    height: 65,
    width: 65,
    resizeMode: 'stretch'
  },
  slotitles: {
    fontSize: 12,
    fontFamily: nunitoSansSemiBold,
    fontWeight: '600'
    // paddingLeft: 20
  },
  slotitlesval: {
    fontSize: 12,
    fontFamily: nunitoSansSemiBold,
    fontWeight: '600'
  },
  noslots: {
    padding: 4,
    fontSize: 11,
    fontFamily: nunitoSansSemiBold
  },
  plancardTitle: {
    textTransform: 'uppercase',
    fontSize: 14,
    fontFamily: poppinsBold,
    fontWeight: 'bold',
    paddingLeft: 2
  },
  cardContent: {
    flex: 2,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  cuisineItem: {
    width: '50%',
    paddingHorizontal: 2,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  cuisineItemInner: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: mischka
  },
  cuisineTimeInner: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    // paddingVertical: 5,
    // paddingHorizontal: 15,
    borderRadius: 5,
    width: '80%'
  },
  bookbtnCon: {
    marginLeft: 25,
    backgroundColor: corn,
    color: white,
    borderRadius: 4,
    overflow: 'hidden',
    width: 65,
    marginBottom: 5
  },
  mealtime: {
    paddingTop: 2,
    width: 100,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  bookbtntext: {
    padding: 3,
    color: darkCyan,
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: poppinsBold
  },
  cuisineImage: {
    width: 22,
    height: 22,
    resizeMode: 'contain'
  },
  cuisineTitle: {
    color: black,
    fontSize: 12,
    fontFamily: poppinsBold,
    fontWeight: 'bold'
  },
  cuisineTitleInactive: {
    color: black,
    fontSize: 12,
    fontFamily: poppinsBold,
    fontWeight: 'bold'
  },
  timeItem: {
    flex: 1
  },
  timeImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    borderRadius: 5
  },
  typeImage: {
    width: 38,
    height: 38,
    resizeMode: 'contain'
  },
  package: {
    alignContent: 'center',
    alignItems: 'center',
    padding: 6,
    backgroundColor: mischka,
    borderRadius: 15,
    marginHorizontal: 28
  },
  packageActive: {
    borderWidth: 1,
    backgroundColor: malibu
  },
  packageInactive: {
    backgroundColor: mischka
  },
  packDays: {
    textAlign: 'center',
    fontFamily: poppinsBold,
    fontSize: 16,
    color: darkCyan,
    fontWeight: '700',
    paddingVertical: 0
  },
  active: {
    color: black
  },
  packTitle: {
    textAlign: 'center',
    color: darkCyan,
    fontSize: 10,
    fontWeight: '600',
    fontFamily: nunitoSansSemiBold
  },
  dateHolder: {
    width: '50%',
    marginVertical: 15
  },
  datePicker: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: cloudBurst,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateIconHolder: {
    justifyContent: 'center',
    padding: 5
  },
  calIcon: {
    width: 13,
    height: 13
  },
  dateText: {
    color: white,
    fontSize: 12,
    fontFamily: nunitoSansSemiBold,
    padding: 6,
    textAlign: 'center',
    fontWeight: '700'
  },
  memberContent: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  memberBtnHolder: {
    flexDirection: 'row'
  },
  memberPicker: {
    height: 50,
    width: '60%',
    fontFamily: arial,
    fontSize: 12,
    color: brightOrange,
    fontWeight: '700'
  },
  btnChangeMembers: {
    backgroundColor: transparent,
    paddingHorizontal: 30,
    paddingVertical: 6,
    borderRadius: 8,
    fontSize: 23,
    color: spanishGray,
    fontWeight: '500',
    fontFamily: semiBold
  },
  memberText: {
    fontFamily: arial,
    fontSize: 23,
    color: spanishGray,
    fontWeight: '700',
    paddingVertical: 5,
    paddingHorizontal: 25
  },
  genderHolder: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    padding: 6,
    backgroundColor: mischka,
    borderRadius: 15,
    marginHorizontal: 4
  },
  cuisineImg: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 150 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    padding: 14
  },
  typeSizeImg: {
    padding: 12
  },
  imageActive: {
    backgroundColor: malibu
  },
  imageInActive: {
    backgroundColor: mischka,
    borderWidth: 0
  },
  genderImage: {
    width: 22,
    height: 22,
    resizeMode: 'contain'
  },
  genderText: {
    fontFamily: semiBold,
    fontWeight: '700',
    fontSize: 10,
    color: spanishGray
  },
  totalHolder: {
    flexDirection: 'row',
    alignContent: 'space-between',
    paddingVertical: 25
  },
  totalLabel: {
    flex: 1
  },
  totalLabelText: {
    fontFamily: medium,
    fontWeight: '500',
    color: white,
    fontSize: 18,
    lineHeight: 23
  },
  totalAmount: {
    flex: 1
  },
  totalAmountText: {
    color: white,
    textAlign: 'right',
    fontSize: 20,
    fontFamily: medium,
    fontWeight: '500'
  },
  btnBookHolder: {
    paddingVertical: 25,
    alignItems: 'center',
    backgroundColor: elephant,
    borderRadius: 25,
    marginTop: 25
  },
  genderContent: {
    justifyContent: 'center'
  },
  container1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: corn,
    color: white,
    width: '40%',
    height: 40,
    borderRadius: 25

  },
  buttonClr: {
    color: white,
    paddingTop: 10,
    fontWeight: '700',
    fontFamily: semiBold
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  slotContainer: {
    fontSize: 12,
    padding: 1,
    flex: 1,
    flexDirection: 'column'
  },
  slotContainerin: {
    flexDirection: 'row'
  },
  slotAvailable: {
    flex: 1,
    flexDirection: 'row'
  },
  slotTime: {
    fontSize: 12,
    fontFamily: nunitoSansSemiBold
    // paddingTop: 5
  },
  errorMsgText: {
    color: dangerText,
    fontSize: 12,
    textAlign: 'center'
  },
  bookType: {
    color: cyanBlack,
    fontSize: 12,
    fontFamily: nunitoSansSemiBold,
    fontWeight: '600',
    alignSelf: 'center',
    paddingRight: 5,
    marginTop: 4,
    textAlign: 'center'
  },
  membersImg: {
    alignSelf: 'center',
    left: 10,
    height: 30,
    width: 30,
    resizeMode: 'stretch'
  },
  membersWidth: {
    width: '50%'
  },
  totalAmountContainer: {
    backgroundColor: elephant,
    borderWidth: 0.0455,
    borderColor: elephant,
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingBottom: 30,
    marginTop: 15
  },
  poppins: {
    fontFamily: poppinsBold
  }
})
