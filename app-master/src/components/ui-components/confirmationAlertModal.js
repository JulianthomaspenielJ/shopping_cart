import React from 'react'
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native'
import { styles } from '../../assets/styles/ratingModal'

const ConformationAlertModal = (props) => {
  const { show, onClose, t, conformatiomButtonText } = props
  const onSubmit = (type) => {
    onClose(type)
  }
  return (
    <View>
      <Modal
        visible={show}
        animationType='fade'
        transparent
        showMarker
      >
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
          <KeyboardAvoidingView
            behavior={(Platform.OS === 'ios') ? 'padding' : null}
            style={{ flex: 1 }}
          >
            <View style={styles.container}>
              <View style={styles.content}>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center'
                  }}
                >
                  <Text style={[styles.title, {
                    marginTop: 15,
                    marginVertical: 50,
                    lineHeight: 25,
                    textAlign: 'center'
                  }]}
                  >
                    {t('get_delivery_address')}
                  </Text>
                </View>
                <View style={[{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }]}>
                  <TouchableOpacity
                    onPress={() => onSubmit('YES')}
                    style={{ width: '100%' }}
                  >
                    {<Text style={styles.submitText}>{conformatiomButtonText}</Text>}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}

export default ConformationAlertModal
