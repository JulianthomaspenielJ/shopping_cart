import React, { useState } from 'react'
import { Modal, Text, Image, View, TouchableOpacity } from 'react-native'
import { styles } from '../../assets/styles/alertModal'
import paymentSuccess from '../../assets/icons/successPay.png'
import paymentFailed from '../../assets/icons/cancel.png'
import paySuccess1 from '../../assets/images/paySuccess1.png'
import paySuccess2 from '../../assets/images/paySuccess2.png'
import payFailiur1 from '../../assets/images/payFailiur1.png'
import payFailiur2 from '../../assets/images/payFailiur2.png'
import Icon from 'react-native-vector-icons/Ionicons'
import { STATUS } from '../../lib/const'
import moment from 'moment'

const AlertModal = (props) => {
  const { type, show, onClose, message, timeSlot, fromDate, bookingTimeDiff } = props
  const [slotTime, setSlotTime] = useState('')
  const [slotTimeId, setSlotTimeId] = useState('')
  const selectSlotTime = (slotsTime, id, isdiffInHours) => {
    if (isdiffInHours) {
      setSlotTime(slotsTime)
      setSlotTimeId(id)
      onClose(slotsTime, id)
    }
  }

  const slots = (slotsVal) => {
    const planFromDate = moment(fromDate).format('YYYY/MM/DD')
    const currentDateTime = moment().format('YYYY-MM-DDTHH:mm')
    const currentDate = moment().format('YYYY/MM/DD')
    return Object.keys(slotsVal.slot).map(function (k) {
      const dailySlotEndTime = moment(planFromDate + ' ' + slotsVal.slot[k]).format('YYYY-MM-DDTHH:mm')
      const currentDateTimestamp = new Date(currentDateTime).getTime()
      const slotDateTimeTimestamp = new Date(dailySlotEndTime).getTime()
      var diff = slotDateTimeTimestamp.valueOf() - currentDateTimestamp.valueOf()
      const diffInHours = diff / 1000 / 60 / 60
      let isdiffInHours = false
      let isSselectedSlot = false
      if (diffInHours > bookingTimeDiff) {
        isdiffInHours = true
      } else if (planFromDate > currentDate) {
        isdiffInHours = true
      }
      if ((slotTime === slotsVal.slot[k])) {
        isSselectedSlot = true
      }
      const slotPicker = (
        <>
          <TouchableOpacity
            key={k}
            disabled={!isdiffInHours}
            onPress={() => selectSlotTime(slotsVal.slot[k], slotsVal._id, isdiffInHours)}
            style={[styles.slotSelection, isdiffInHours ? ((isSselectedSlot) ? styles.bgtangerine : styles.bggainsboro) : styles.bgsearchIconColor]}
          >
            {
              isdiffInHours ? (
                <Text style={[styles.slontTextactive, isSselectedSlot ? styles.colorwhite : styles.colorblack]}>
                  {slotsVal.slot[k]}
                </Text>)
                : (
                  <Text style={[styles.slontTextactive, isSselectedSlot ? styles.colorwhite : isdiffInHours ? styles.colorblack : styles.colorboxShadow]}>
                    {slotsVal.slot[k]}
                  </Text>)
            }
          </TouchableOpacity>
        </>
      )
      return slotPicker
    })
  }
  return (
    <Modal
      visible={show}
      animationType='fade'
      transparent
      showMarker
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.modalcontainer}>
            <View style={styles.titleContainer}>
              {
                type === 'timeslot' ? (
                  <Text style={styles.slotname}>{timeSlot.name}</Text>
                ) : null
              }
            </View>
            <View style={styles.titleContainer}>
              {
                type === 'timeslot' ? (
                  <Text style={[styles.slotname, styles.fromDate]}>{moment(fromDate).format('ll')}</Text>
                ) : null
              }
            </View>
            {type === 'timeslot' &&
              <View style={styles.closeHolder}>
                <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => onClose(slotTime, slotTimeId)}>
                  <Icon name='ios-close' style={styles.close} />
                </TouchableOpacity>
              </View>}
          </View>
          <View style={type === 'timeslot' ? styles.slotmodalBody : ''}>
            {
              type === 'timeslot' ? (
                <View>
                  <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
                    {slots(timeSlot)}
                  </View>
                </View>)
                : (
                  <View>
                    <View style={{
                      position: 'absolute',
                      alignSelf: 'flex-end',
                      zIndex: 2,
                      top: -8
                    }}
                    >
                      <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => onClose(slotTime, slotTimeId)}>
                        <Icon name='ios-close' style={styles.close1} />
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.modalBody, { flexDirection: 'row', height: 250 }]}>
                      <Image source={type === STATUS.SUCCESS ? paySuccess1 : payFailiur2} style={type === STATUS.SUCCESS ? styles.modalHolderImage : styles.modalHolderImage1} />
                      <View style={{ width: '95%', alignItems: 'center' }}>
                        <Image source={type === STATUS.SUCCESS ? paymentSuccess : paymentFailed} style={styles.modalImage} />
                        <Text style={styles.message}>{message || ''}</Text>
                      </View>
                      <Image source={type === STATUS.SUCCESS ? paySuccess2 : payFailiur1} style={type === STATUS.SUCCESS ? [styles.modalHolderImage, { right: 0, borderRadius: 0 }] : [styles.modalHolderImage1, { left: 10 }]} />
                    </View>
                  </View>)
            }
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default AlertModal
