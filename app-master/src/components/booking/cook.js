import React, { useState, useEffect } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { styles } from '../../assets/styles/cook'
import { IMAGE_BASE_URL } from 'react-native-dotenv'
import cookMale from '../../assets/images/detailsCookImgMale.png'
import cookFemale from '../../assets/images/detailsCookImg.png'
import ImageViewer from '../ui-components/imageViewer'

const Cook = (props) => {
  const { cookDetails } = props
  const image = (cookDetails && cookDetails.gender === 'MALE') ? cookMale : cookFemale
  const imageUrl = (cookDetails && cookDetails.avatar) ? { uri: `${IMAGE_BASE_URL}${cookDetails.avatar}` } : image
  const cookNmae = (cookDetails && cookDetails.name) ? cookDetails.name : ''
  const [selectedCookImage, setSelectedCookImage] = useState([])
  const [visible, setIsVisible] = useState(false)

  useEffect(() => {
    const imagesList = []
    if (cookDetails) {
      imagesList.push(imageUrl)
    }
    setSelectedCookImage(imagesList)
  }, [cookDetails])

  const viewCookImage = () => {
    setIsVisible(!visible)
  }

  return (
    <TouchableOpacity
      style={styles.cookHolder}
      onPress={() => viewCookImage()}
    >
      <View>
        <Image source={imageUrl} style={styles.cookProfile} />
      </View>
      <View style={styles.cookIconHolder} />
      <View>
        <Text style={styles.cookName}>{cookNmae}</Text>
      </View>
      <ImageViewer
        images={selectedCookImage}
        visible={visible}
        onClose={() => viewCookImage(false)}
      />
    </TouchableOpacity>
  )
}

export default Cook
