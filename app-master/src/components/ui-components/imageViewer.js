import React from 'react'
import ImageView from 'react-native-image-viewing'

const ImageViewer = (props) => {
  const { onClose, visible, images } = props

  return (
    <ImageView
      images={images}
      imageIndex={0}
      visible={visible}
      onRequestClose={onClose}
    />
  )
}
export default ImageViewer
