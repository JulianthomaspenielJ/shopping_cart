import React, { useState } from 'react'
import {
  TextInput,
  View,
  Text
} from 'react-native'
import { input } from '../../assets/styles/input'

const Input = (props) => {
  const [inputFocus, setInputFocus] = useState(false)
  const onFocus = () => {
    setInputFocus(true)
  }
  const onBlur = () => {
    setInputFocus(false)
  }
  const { placeholder, label, userType, keyboardType, maxLength, onChangeText, value, showError } = props
  const styleUser = [input.fieldSet, input.fieldSetUser]
  const styleCook = [input.fieldSet, input.fieldSetCook]
  const textStyleUser = [input.legend, input.legendUser]
  const textStyleCook = [input.legend, input.inputFocus]
  const fieldSetError = [input.fieldSet, input.fieldSetError]
  const legendError = [input.legend, input.legendError]
  return (
    <View style={inputFocus ? (userType ? styleUser : styleCook) : (showError ? fieldSetError : input.fieldSet)}>
      <Text style={inputFocus ? (userType ? textStyleUser : textStyleCook) : (showError ? legendError : input.legend)}>{label}
      </Text>
      <TextInput
        style={input.inputText}
        onFocus={() => onFocus()}
        onBlur={() => onBlur()}
        keyboardType={keyboardType || 'default'}
        maxLength={maxLength || 40}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
      />
    </View>
  )
}
export default Input
