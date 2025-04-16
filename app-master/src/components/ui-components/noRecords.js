import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'
import Emoji from '../../assets/icons/emoji.png'
import { noRecordsStyle } from '../../assets/styles/noRecordsStyle'
import { withTranslation } from 'react-i18next'

const NoRecords = (props) => {
  const { msg, enableEmoji, t, news, newsMsg } = props
  const [notification, setNotification] = useState('')

  const showAlert = () => {
    setNotification('Thank You for reporting to us')
  }
  return (
    <View style={noRecordsStyle.container}>
      {
        enableEmoji && (
          <View style={noRecordsStyle.emojiContainer}>
            <Image source={Emoji} style={noRecordsStyle.emoji} />
          </View>
        )
      }
      <View style={noRecordsStyle.sorryMsgContainer}>
        {news ? (
          <Text style={noRecordsStyle.sorryText}>{news}</Text>
        ) : (<Text style={noRecordsStyle.sorryText}>{t('sorry_text')}</Text>)}
      </View>
      <View style={[noRecordsStyle.sorryMsgContainer, { justifyContent: 'center' }]}>
        {msg ? (
          <Text style={noRecordsStyle.sorryMsg}>{msg}</Text>
        ) : (
          <>
            <Text style={noRecordsStyle.sorryMsg}>{t('no_results_found_location')}</Text>
            <Text style={noRecordsStyle.sorryMsg}>{t('ensure_set_locattion')}</Text>
            <Text style={noRecordsStyle.sorryMsg}>{t('or_change_Search_word')}</Text>
          </>
        )}
        {newsMsg ? <Text style={noRecordsStyle.sorryMsg}>{newsMsg}</Text> : null}
      </View>
      {!msg ? (
        <TouchableOpacity
          style={noRecordsStyle.noCookBtn}
          onPress={() => showAlert()}
        >
          <Text
            style={noRecordsStyle.noCookText}
          >Report us if no cook found in your area
          </Text>
        </TouchableOpacity>
      ) : null}
      <View>
        <Text style={noRecordsStyle.notification}>{notification}</Text>
      </View>
    </View>
  )
}

export default (withTranslation()(NoRecords))
