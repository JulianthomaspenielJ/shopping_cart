import { StyleSheet, Platform } from 'react-native'
import {
  white,
  transparent
} from './colors'

export const styles = StyleSheet.create({
  bankContainer: {
    flex: 1,
    backgroundColor: white
  },
  backArrow: {
    width: 20,
    height: 20
  },
  backArrowCont: {
    padding: 25
  },
  container: {
    backgroundColor: transparent,
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33,
    borderBottomColor: transparent
  },
  formContainer: {
    paddingTop: 30,
    backgroundColor: white
  },
  navArea: {
    flexDirection: 'row',
    alignContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 40 : 15,
    paddingHorizontal: 4
  },
  titleHolder: {
    paddingLeft: '22%',
    justifyContent: 'center'
  },
  headerTitle: {
    color: white,
    fontSize: 18
  },
  bgColor: {
    flex: 1
  },
  Mapcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  map: {
    flex: 1
  },
  mapIcon: {
    width: 45,
    height: 45
  }
})
