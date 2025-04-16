import React from 'react'
import { Modal, Text, Image, View, TouchableOpacity } from 'react-native'
import { styles } from '../../assets/styles/updateAlertModal'
import updateIcon from '../../assets/icons/update.png'
import Icon from 'react-native-vector-icons/Ionicons'
import GradiantButton from '../../components/ui-components/gradiantButton'
import { gradiant } from '../../assets/styles/grandiantButton'

const UpdateAlertModal = (props) => {
  const { show, showClose, onClose, onUpdate } = props
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
            {showClose ? (
              <TouchableOpacity onPress={() => onClose()}>
                <Icon name='ios-close' style={styles.close} />
              </TouchableOpacity>) : null}
          </View>
          <View style={showClose ? styles.modalBody : [styles.modalBody, styles.mbodyWithoutClose]}>
            <View style={styles.modalImageHolder}>
              <Image source={updateIcon} style={styles.modalImage} />
            </View>
            <Text style={styles.message}>New version of app is available. Please Update!</Text>
            <View style={styles.btnHolder}>
              <GradiantButton
                label='Update Now'
                onPress={() => onUpdate()}
                bottonStyle={gradiant.container}
                labelStyle={gradiant.btnLabel}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default UpdateAlertModal
