import React from 'react'
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  ShineOverlay
} from 'rn-placeholder'
import { View } from 'react-native'

const Loader = () => {
  return (
    <View style={{ margin: 30 }}>
      <Placeholder
        Animation={ShineOverlay}
        Left={PlaceholderMedia}
        Right={PlaceholderMedia}
      >
        <PlaceholderLine width={80} />
        <PlaceholderLine />
        <PlaceholderLine width={30} />
      </Placeholder>
    </View>
  )
}

export default Loader
