import React from 'react'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import { radioStyles } from '../../assets/styles/radioGroup'
import { corn, red, jacksonsPurple } from '../../assets/styles/colors'

const RadioGroup = (props) => {
  const { selected, options, onPress, buttonOuterColor, buttonInnerColor, genderErr, labelStyle } = props
  const radioProps = options
  return (
    <RadioForm
      initial={0}
      formHorizontal
    >
      {
        radioProps.map((obj, i) => (
          <RadioButton labelHorizontal key={i}>
            <RadioButtonInput
              obj={obj}
              index={i}
              isSelected={selected === i}
              onPress={(value) => onPress(value, obj)}
              borderWidth={1}
              buttonInnerColor={buttonInnerColor ? corn : jacksonsPurple}
              buttonOuterColor={genderErr ? red : buttonOuterColor ? corn : jacksonsPurple}
              buttonSize={15}
              buttonOuterSize={20}
              buttonWrapStyle={{ marginLeft: 10 }}
            />
            <RadioButtonLabel
              obj={obj}
              index={i}
              labelHorizontal
              onPress={(value) => onPress(value)}
              labelStyle={labelStyle || (genderErr ? [radioStyles.labelStyle, radioStyles.labelStyleErr] : radioStyles.labelStyle)}
              labelWrapStyle={{}}
            />
          </RadioButton>
        ))
      }
    </RadioForm>
  )
}

export default RadioGroup
