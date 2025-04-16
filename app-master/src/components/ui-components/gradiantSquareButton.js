import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { corn, gold } from '../../assets/styles/colors'

const GradiantSquareButton = (props) => {
  const { label, onPress, bottonStyle, labelStyle } = props
  return (
    <LinearGradient
      colors={[gold, corn]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={bottonStyle}
    >
      <TouchableOpacity onPress={() => onPress()}>
        <Text style={labelStyle}>{label || ''}</Text>
      </TouchableOpacity>
    </LinearGradient>
  )
}

export default GradiantSquareButton
