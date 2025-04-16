import { StyleSheet, Platform } from 'react-native'
import {
  white,
  tangerine,
  borderBootomProfile,
  boxShadowColor,
  graniteGray
} from './colors'
import { medium, semiBold } from './fonts'

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
    flex: 1,
    alignItems: 'flex-start',
    padding: 2,
    fontSize: 15,
    width: '100%',
    color: graniteGray
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
  uploadlinerText: {
    padding: 6,
    flexDirection: 'row',
    borderRadius: 25,
    paddingHorizontal: 15
  },
  uploadText: {
    color: white,
    fontFamily: semiBold,
    fontSize: 14,
    fontWeight: '600'
  },
  uploadImg: {
    width: 12,
    height: 12,
    marginRight: 6
  },
  btnContainer: {
    padding: 40,
    paddingTop: 20
  }
})
