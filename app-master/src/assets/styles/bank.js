import { StyleSheet, Platform } from 'react-native'
import {
  white,
  tangerine,
  borderBootomProfile,
  boxShadowColor,
  graniteGray,
  black
} from './colors'
import { medium } from './fonts'

export const styles = StyleSheet.create({
  bankContainer: {
    flex: 1,
    backgroundColor: white
  },
  backArrow: {
    width: 20,
    height: 20
  },
  container: {
    backgroundColor: tangerine,
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33
  },
  formContainer: {
    paddingTop: 30,
    backgroundColor: white
  },
  navArea: {
    flexDirection: 'row',
    alignContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : 15,
    paddingHorizontal: 15
  },
  titleHolder: {
    paddingLeft: '10%',
    justifyContent: 'center'
  },
  headerTitle: {
    color: white,
    fontSize: 18
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 0.3,
    padding: 14,
    paddingTop: 0,
    borderRadius: 10
  },
  formRow: {
    borderColor: white,
    padding: 12,
    borderBottomColor: borderBootomProfile
  },
  dropdownStyle: {
    width: '94%',
    marginLeft: 12,
    height: 30
  },
  dropdownStyleOther: {
    width: '100%'
  },
  dropDown: {
    paddingTop: 20,
    backgroundColor: boxShadowColor,
    shadowColor: boxShadowColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 0,
    fontFamily: medium
  },
  textInput: {
    padding: 2,
    fontSize: 18,
    width: '100%',
    color: graniteGray,
    fontFamily: medium
  },
  linerText: {
    alignItems: 'center',
    borderRadius: 5,
    padding: 15
  },
  btnText: {
    color: white,
    fontFamily: medium,
    fontWeight: '400',
    fontSize: 18
  },
  btnContainer: {
    padding: 40,
    paddingTop: 20
  },
  label: {
    fontSize: 16,
    color: black,
    fontFamily: medium
  }
})
