import React from 'react'
import Switches from 'react-native-switches'
import {
  white,
  corn,
  successText,
  dangerText,
  olivine,
  burntSienna
} from '../../assets/styles/colors'
import {
  nunitoSansBold
} from '../../assets/styles/fonts'

const StatusSwitch = (props) => {
  const { onChange, value, shape, disabled, showText } = props
  return (
    <Switches
      disabled={disabled}
      shape={shape}
      onChange={onChange}
      value={value}
      showText={!!showText}
      buttonColor={showText ? white : (value ? successText : dangerText)}
      borderColor={white}
      buttonOffsetLeft={showText ? 5 : 3}
      buttonOffsetRight={showText ? 5 : 3}
      buttonSize={20}
      sliderHeight={showText ? 30 : 25}
      sliderWidth={showText ? 65 : 40}
      colorSwitchOn={showText ? olivine : corn}
      colorSwitchOff={showText ? burntSienna : corn}
      textFont={showText ? nunitoSansBold : null}
      colorTextOff={showText ? white : null}
      textSize={showText ? 13 : null}
      textOn={showText ? ' ON' : null}
      textOff={showText ? 'OFF' : null}
      spaceBetween={showText ? 1 : null}
    />
  )
}

export default StatusSwitch
