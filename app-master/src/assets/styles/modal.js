import { StyleSheet } from 'react-native'
import { white, black, emperor, gallery, modalBackground } from './colors'
import { medium, regular } from './fonts'

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: modalBackground,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalCard: {
    backgroundColor: white,
    borderColor: white,
    borderRadius: 10,
    borderWidth: 1,
    height: 330,
    padding: 30,
    width: '80%'
  },
  modalTitle: {
    color: black,
    fontFamily: medium,
    fontSize: 13,
    fontWeight: '500'
  },
  modalHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rupeeIcon: {
    paddingTop: 5,
    paddingHorizontal: 5
  },
  modalBodyContent: {
    marginVertical: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: gallery,
    borderBottomWidth: 1
  },
  modalBodyText: {
    color: emperor,
    fontFamily: regular,
    fontSize: 12,
    fontWeight: '400',
    marginVertical: 3
  },
  dateTImeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  gradientButton: {
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
    paddingVertical: 15
  },
  gradientButtonText: {
    color: white,
    fontFamily: medium,
    fontWeight: '400',
    fontSize: 18
  },
  imageIcons: {
    height: 10,
    width: 10,
    resizeMode: 'stretch',
    marginTop: 6,
    marginRight: 5
  }
})

export default styles
