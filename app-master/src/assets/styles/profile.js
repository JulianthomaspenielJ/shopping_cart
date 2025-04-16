import { StyleSheet } from 'react-native'
import {
  white,
  tangerine,
  borderBootomProfile,
  transparent,
  corn,
  editBg,
  black
} from './colors'
import {
  medium,
  nunitoSansRegular,
  poppinSemiBold,
  poppinsMedium
} from './fonts'

export const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: white
  },
  gradient: {
    padding: 15
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  arrowImg: {
    width: 17,
    height: 17,
    paddingLeft: 20
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: poppinSemiBold,
    color: black,
    fontSize: 18
  },
  menuImg: {
    width: 25,
    height: 20,
    resizeMode: 'contain'
  },
  profile: {
    height: 250,
    justifyContent: 'center',
    paddingTop: 30
  },
  formContainer: {
    paddingTop: 23
  },
  ownerAvatarImg: {
    width: 150,
    height: 150,
    borderRadius: 25,
    resizeMode: 'contain',
    alignItems: 'center'
  },
  bgProfile: {
    width: '100%',
    flex: 1,
    height: 250,
    position: 'absolute'
  },
  editIconCont: {
    height: 35,
    width: 35,
    borderRadius: 25,
    backgroundColor: tangerine,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: white
  },
  editIconContCook: {
    backgroundColor: corn
  },
  editText: {
    padding: 3,
    color: editBg,
    fontSize: 11
  },
  editIconText: {
    backgroundColor: white,
    borderRadius: 25,
    width: 55,
    alignItems: 'center'
  },
  editIcon: {
    fontSize: 20,
    color: white
  },
  coverImg: {
    flex: 1,
    height: 250
  },
  ownerBg: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    color: white
  },
  profileName: {
    fontSize: 18,
    fontFamily: medium,
    color: black,
    paddingTop: 2,
    textAlign: 'justify',
    lineHeight: 30,
    fontWeight: '600'
  },
  profileNo: {
    color: black,
    paddingTop: 4,
    paddingBottom: 10,
    fontSize: 14,
    fontWeight: '500'
  },
  label: {
    fontSize: 16,
    color: black,
    fontFamily: medium
  },
  addlabel: {
    fontSize: 14,
    position: 'absolute',
    right: 0,
    bottom: 4
  },
  addresslabel: {
    bottom: 14
  },
  btnlabel: {
    position: 'absolute',
    backgroundColor: corn,
    color: black,
    padding: 6,
    width: 100,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    paddingTop: 13,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  fontIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 20,
    color: black
  },
  dropIcon: {
    color: black,
    paddingRight: 4
  },
  imageIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  imageContainer: {
    width: 20
  },
  textInput: {
    paddingLeft: 18,
    fontSize: 17,
    width: '100%',
    backgroundColor: transparent,
    color: black,
    fontFamily: medium
  },
  description: {
    width: '100%',
    fontSize: 15,
    borderWidth: 1,
    borderColor: borderBootomProfile,
    padding: 2,
    minHeight: 100
  },
  formRow: {
    borderColor: black,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: borderBootomProfile
  },
  textAddInput: {
    paddingTop: 6
  },
  dropdownStyle: {
    marginLeft: 25,
    width: '92%',
    height: 30
  },
  dropdownStyleOther: {
    width: '100%'
  },
  dropDown: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  phoneText: {
    marginLeft: 5
  },
  multiselect: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    marginRight: 29
  },
  profileUserName: {
    fontSize: 24,
    fontFamily: nunitoSansRegular,
    color: black,
    paddingTop: 2,
    textAlign: 'justify',
    lineHeight: 30,
    fontWeight: 'bold'
  },
  submitText: {
    color: black,
    fontFamily: poppinsMedium,
    fontSize: 18
  },
  saveBtn: {
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    padding: 15,
    backgroundColor: 'white'
  }
})
