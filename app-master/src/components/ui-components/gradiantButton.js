import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { tangerine, koromiko } from '../../assets/styles/colors'
import Spinner from './Spinner'

const GradiantButton = (props) => {
  const { label, onPress, bottonStyle, labelStyle, loading } = props
  return (
    <LinearGradient
      colors={[tangerine, koromiko]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={bottonStyle}
    >
      <TouchableOpacity onPress={() => onPress()}>
        {loading ? <Spinner /> : <Text style={labelStyle}>{label || ''}</Text>}
      </TouchableOpacity>
    </LinearGradient>
  )
}

export default GradiantButton
