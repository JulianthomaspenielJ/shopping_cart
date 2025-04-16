import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import check from '../../assets/icons/checked1.png'
import unchecked from '../../assets/icons/unchecked1.png'
import { styles } from '../../assets/styles/checkbox'

const CheckBox = (props) => {
  const { label, value, checked, onCheckPressed, style, checkboxSize, labelStyle } = props
  return (
    <View style={style || {}}>
      <TouchableOpacity
        onPress={() => onCheckPressed(!checked, value)}
      >
        <View style={styles.container}>
          <Image source={checked ? check : unchecked} style={checkboxSize || styles.icon} />
          <Text style={labelStyle || styles.label}>{label || ''}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default CheckBox
