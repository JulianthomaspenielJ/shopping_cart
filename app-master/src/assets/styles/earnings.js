import { StyleSheet } from 'react-native'
import { spanishGray, black, grey20, sushi, corn } from './colors'
import { medium, poppinsBold } from './fonts'

export const earnings = StyleSheet.create({
  earningsContainer: {
    marginVertical: 20,
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: spanishGray
  },
  dateContainer: {
    paddingTop: 5,
    paddingHorizontal: 15
  },
  dateContainerText: {
    color: spanishGray,
    fontFamily: medium,
    fontSize: 12,
    fontWeight: '500'
  },
  borderLayer: {
    borderBottomColor: black,
    borderBottomWidth: 1,
    margin: 10,
    opacity: 0.16
  },
  totalEarningsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    marginHorizontal: 15
  },
  totalEarningsText: {
    color: grey20,
    fontFamily: medium,
    fontSize: 18,
    fontWeight: '700'
  },
  earningsImg: {
    height: 65,
    width: 70,
    resizeMode: 'stretch',
    marginTop: 5
  },
  icon: {
    color: sushi,
    fontFamily: poppinsBold
  },
  earningAmountText: {
    color: sushi,
    fontFamily: poppinsBold,
    fontSize: 17,
    fontWeight: 'bold'
  },
  orderId: {
    color: corn
  },
  totalEarningsTextContainer: {
    paddingVertical: 20
  }
})
