import { StyleSheet } from 'react-native'
import {
  grey20,
  grey,
  white,
  corn,
  gainsboro,
  hokeyPokey,
  darkCyan,
  outrageousOrange,
  blueDianne
} from './colors'
import {
  medium,
  poppinSemiBold,
  nunitoBold,
  nunitoSemiBold
} from './fonts'

export const orders = StyleSheet.create({
  maiContainer: {
    marginVertical: 15,
    marginTop: 25
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  ordersList: {
    borderWidth: 1,
    borderColor: gainsboro,
    borderRadius: 10,
    padding: 15
  },
  orderDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  idText: {
    color: grey20,
    fontSize: 12,
    fontFamily: medium,
    fontWeight: '600'
  },
  cuisines: {
    color: grey
  },
  setHeight: {
    paddingTop: 4
  },
  icon: {
    paddingVertical: 4,
    paddingHorizontal: 3,
    paddingTop: 6
  },
  amountContainer: {
    flexDirection: 'row'
  },
  toDate: {
    justifyContent: 'flex-end'
  },
  menuIcon: {
    height: 10,
    width: 10,
    resizeMode: 'stretch',
    marginTop: 4,
    marginRight: 5
  },
  orderTimeSchedule: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  datesection: {
    marginBottom: 6
  },
  orderCompletedContainer: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 33
  },
  orderCompleted: {
    textAlign: 'center',
    fontFamily: medium,
    fontWeight: '500',
    color: white,
    fontSize: 10
  },
  callIconContainer: {
    backgroundColor: corn,
    borderWidth: 1,
    borderColor: corn,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 20,
    width: 20,
    left: 55,
    top: 0
  },
  toDateEnd: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  viewDetails: {
    color: corn,
    fontSize: 12
  },
  pt5: {
    paddingTop: 15,
    flexDirection: 'row'
  },
  chefImage: {
    height: 35,
    width: 35,
    marginRight: 10,
    borderRadius: 20
  },
  directionIcon: {
    marginTop: 4,
    marginRight: 6,
    height: 10,
    width: 7,
    resizeMode: 'stretch'
  },
  statusText: {
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  norecord: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  norecordtext: {
    fontSize: 16,
    fontFamily: medium
  },
  totalPrice: {
    fontFamily: poppinSemiBold,
    fontSize: 14
  },
  orderIdText: {
    fontFamily: nunitoBold,
    color: hokeyPokey,
    fontSize: 14
  },
  orderIdValue: {
    fontFamily: nunitoBold,
    color: darkCyan,
    fontSize: 14
  },
  viewDetailsText: {
    fontSize: 10,
    fontFamily: nunitoBold,
    color: white,
    alignItems: 'flex-end',
    backgroundColor: outrageousOrange,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'center',
    alignContent: 'flex-end',
    overflow: 'hidden'
  },
  totalAmount: {
    fontFamily: nunitoSemiBold,
    color: blueDianne,
    fontSize: 14
  }
})
