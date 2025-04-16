import React, { useState } from 'react'
import {
  Modal,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from '../../assets/styles/quiickBookModal'
import moment from 'moment'

const QuickBookAlertModal = (props) => {
  const { show, slots, onClose, fromDate, selectedMealType } = props
  const [slectedSlotTime, setSelectedSlotTime] = useState('')
  const [, setState] = useState()
  const getSlots = (slots) => {
    return Object.keys(slots).map(function (k, index) {
      let isSselectedSlot = false
      if ((slectedSlotTime === slots[k])) {
        isSselectedSlot = true
      }
      return (
        <TouchableOpacity
          key={index}
          onPress={() => selctSlotValue(slots[k])}
        >
          <Text
            style={isSselectedSlot ? [styles.timeSlotText, styles.afterSelect] : styles.timeSlotText}
          >
            {slots[k]}
          </Text>
        </TouchableOpacity>
      )
    })
  }
  const selctSlotValue = (data) => {
    setSelectedSlotTime(data)
    onClose(false, data)

    setState({})

  }
  const currentDate = moment(fromDate).format('YYYY/MM/DD')
  return (
    <Modal
      visible={show}
      animationType='fade'
      transparent
      showMarker
      backgroundColor='green'
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
          >
            <Text style={[styles.selectedMealType, styles.dinnerText]}>{selectedMealType}</Text>
            <Text style={styles.selectedMealType}>{currentDate}</Text>
            <TouchableOpacity
              style={{ alignItems: 'flex-end' }}
              onPress={() => onClose(false, slectedSlotTime)}
            >
              <Icon name='ios-close' style={styles.close} />
            </TouchableOpacity>
          </View>
          <View
            style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}
          >
            {getSlots(slots)}
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default QuickBookAlertModal
