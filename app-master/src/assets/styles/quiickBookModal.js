import { StyleSheet } from 'react-native'
import {
  mischka,
  white,
  blueCyan,
  darkYellow
} from './colors'
import {
  poppinsMedium
} from './fonts'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modal: {
    padding: 20,
    backgroundColor: white,
    height: '40%',
    width: '96%',
    borderWidth: 1,
    borderColor: '#fff',
    // marginTop: '50%',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 35,
    overflow: 'hidden'

  },
  selectedMealType: {
    color: blueCyan,
    fontFamily: poppinsMedium,
    fontWeight: '700',
    fontSize: 16
  },
  close: {
    fontSize: 30,
    fontWeight: '700',
    padding: 10,
    position: 'relative',
    top: -15

  },
  timeSlotText: {
    backgroundColor: mischka,
    padding: 10,
    textAlign: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    margin: 5,
    fontSize: 12
  },
  afterSelect: {
    backgroundColor: darkYellow
  },
  dinnerText: {
    color: darkYellow
  }
})
