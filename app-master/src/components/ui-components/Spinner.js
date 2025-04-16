import React from 'react'
import { ActivityIndicator } from 'react-native'
import { white } from '../../assets/styles/colors'

const Spinner = (props) => {
  const { color } = props
  return (
    <ActivityIndicator size='small' color={color || white} />
  )
}

export default Spinner
