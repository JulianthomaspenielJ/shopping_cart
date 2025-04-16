import React from 'react'
import { Modal, Text, Image, View, TouchableOpacity } from 'react-native'
import { styles } from '../../assets/styles/cancelOrderModal'
import cancelIcon from '../../assets/icons/cancel.png'
import Icon from 'react-native-vector-icons/Ionicons'
import GradiantSquareButton from '../../components/ui-components/gradiantSquareButton'

const CancelOrderModal = (props) => {
  const { show, onClose, onCancelOrder } = props
  return (
    <Modal
      visible={show}
      animationType='fade'
      transparent
      showMarker
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.closeHolder}>
            <TouchableOpacity onPress={() => onClose()}>
              <Icon name='ios-close' style={styles.close} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <Image source={cancelIcon} style={styles.modalImage} />
            <Text style={styles.message}>Are you sure you want to cancel the accepted order?</Text>
            <View style={{ width: '100%' }}>
              <GradiantSquareButton
                label='Cancel'
                onPress={() => onCancelOrder()}
                bottonStyle={styles.btnSquare}
                labelStyle={styles.btnLabel}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default CancelOrderModal
