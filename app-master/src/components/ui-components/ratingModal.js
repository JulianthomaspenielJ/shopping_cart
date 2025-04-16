import React, { useState } from 'react'
import {
  Modal,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native'
import { styles } from '../../assets/styles/ratingModal'
import { AirbnbRating } from 'react-native-ratings'
import CookImg from '../../assets/images/detailsCookImg.png'
import { IMAGE_BASE_URL } from 'react-native-dotenv'

const RatingModal = (props) => {
  const { show, onClose, t, reviewData, userType } = props
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')
  const [errorCommentMsg, setErrorCommentMsg] = useState('')
  const [bookingDataId, setBookingDataId] = useState('')
  const onSubmit = () => {
    setComment(comment.trim())
    if (rating === 0) {
      setErrorMsg(t('choose_rating'))
    } else if (!comment) {
      setErrorCommentMsg(t('enter_comments'))
    }else {
      onClose(rating, comment, bookingDataId)
      setErrorMsg('')
      setRating(0)
      setComment('')
    }
  }
  const sendRatingData = (r, item) => {
    setBookingDataId(item)
    setRating(r)
  }
  return (
    <View>
      {reviewData && reviewData.length ? (reviewData && reviewData.map(function (item, index) {
        const imageUrl = (userType === 'WORKER') ? (
          (item && item.customer && item.customer.user && item.customer.user.avatar) ? { uri: `${IMAGE_BASE_URL}${item.customer.user.avatar}` } : CookImg) : (
          (item && item.worker && item.worker.user && item.worker.user.avatar) ? { uri: `${IMAGE_BASE_URL}${item.worker.user.avatar}` } : CookImg)
        return (
          <Modal
            visible={show}
            animationType='fade'
            transparent
            showMarker
            key={index}
          >
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
              <KeyboardAvoidingView
                behavior={(Platform.OS === 'ios') ? 'padding' : null}
                style={{ flex: 1 }}
              >
                <View style={styles.container}>
                  <View style={styles.content}>
                    <View>
                      <Image source={imageUrl} style={styles.cookAvatar} />
                      <Text style={[styles.title, {
                        alignSelf: 'center',
                        marginTop: 5
                      }]}
                      >
                        {(userType === 'WORKER') ? (item && item.customer && item.customer.user && item.customer.user.name ? item.customer.user.name : '')
                          : (item && item.worker && item.worker.user && item.worker.user.name ? item.worker.user.name : '')}
                      </Text>
                      <Text style={[styles.title, {
                        alignSelf: 'center',
                        marginTop: 5
                      }]}
                      >
                  Order Id : {item && item.bookingId ? item.bookingId : ''}
                      </Text>
                    </View>
                    <Text style={styles.title}>Rate</Text>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      backgroundColor: '#e6eef9',
                      borderRadius: 20,
                      padding: 25
                    }}
                    >
                      <View style={styles.ratingHolder}>
                        <AirbnbRating
                          defaultRating={rating}
                          showRating={false}
                          starStyle={{ width: 20, height: 20 }}
                          onFinishRating={(r) => sendRatingData(r, item)}
                        />
                      </View>
                      <Text style={[styles.title, {
                        marginTop: 15,
                        paddingRight: 15
                      }]}
                      >{rating}
                      </Text>
                    </View>
                    <View style={styles.commentHolder}>
                      <Text style={styles.title}>Comment</Text>
                      <TextInput
                        placeholder='Type your Comments'
                        style={styles.comment}
                        value={comment}
                        onChangeText={text => setComment(text)}
                        multiline
                        editable
                        maxLength={50}
                        numberOfLines={5}
                      />
                      <Text style={styles.errMsg}>{errorMsg}</Text>
                      <Text style={styles.errMsg}>{errorCommentMsg}</Text>
                    </View>
                    <View style={styles.btnHolder}>
                      <TouchableOpacity
                        onPress={onSubmit}
                      >
                        <Text style={styles.submitText}>Submit</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </Modal>
        )
      })) : null}
    </View>
  )
}

export default RatingModal
