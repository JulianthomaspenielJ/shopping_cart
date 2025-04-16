import { StyleSheet, Platform } from 'react-native'
import {
  black,
  corn,
  transparent,
  white,
  silverChalice,
  cookShadow,
  dangerText,
  gainsboro
} from './colors'
import { mtCorsva, semiBold, medium, poppinsExtra } from './fonts'

export const cookSignUp = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 25,
    marginTop: 10
  },
  titleText: {
    color: black,
    fontFamily: mtCorsva,
    fontSize: 28,
    fontWeight: '400',
    paddingLeft: 50
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  formContent: {
    backgroundColor: transparent,
    padding: 25,
    borderRadius: 2,
    shadowColor: corn,
    shadowRadius: 10,
    shadowOpacity: 0,
    elevation: 3,
    shadowOffset: {
      width: 1,
      height: 0
    },
    width: '100%',
    ...Platform.select({
      ios: {
        borderWidth: 1,
        borderColor: gainsboro
      }
    })
  },
  signUpTitleTextContainer: {
    flexDirection: 'row'
  },
  signUpTitleText: {
    color: corn,
    fontFamily: semiBold,
    fontSize: 22,
    fontWeight: '600'
  },
  signUpTitleImage: {
    marginVertical: 8,
    marginRight: 8,
    height: 17
  },
  formInput: {
    marginTop: 30
  },
  beforeBorderColor: {
    borderColor: corn
  },
  datePicker: {
    width: 300,
    position: 'absolute',
    bottom: 5,
    opacity: 0
  },
  legendText: {
    backgroundColor: white,
    paddingHorizontal: 10,
    paddingVertical: 3,
    color: silverChalice,
    fontFamily: medium,
    fontWeight: '400',
    fontSize: 12,
    position: 'absolute',
    textShadowColor: cookShadow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    top: -13,
    left: 0
  },
  legendErr: {
    color: dangerText
  },
  radioInputs: {
    marginTop: 20,
    marginLeft: 20
  },
  genderErrMsg: {
    marginLeft: 10
  },
  dropdownText: {
    position: 'absolute',
    backgroundColor: white,
    padding: 3,
    paddingHorizontal: 10,
    fontFamily: poppinsExtra,
    fontSize: 12,
    fontWeight: '300',
    left: 25,
    bottom: 43,
    zIndex: 2
  },
  autoCompleteMaincontainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    flex: 1,
    borderRadius: 15
  },
  itemText: {
    fontSize: 15,
    margin: 2,
    padding: 8
  }
})
