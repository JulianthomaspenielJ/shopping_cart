import React from 'react'
import DatePicker from 'react-native-datepicker'
import { DATE_FORMAT } from 'react-native-dotenv'
import { Appearance } from 'react-native-appearance'
import moment from 'moment'

const colorScheme = Appearance.getColorScheme()
const isDarkModeEnabled = colorScheme === 'dark'

const DateSelector = (props) => {
  const { date, style, onDateChange } = props
  return (
    <DatePicker
      style={style}
      date={date}
      mode='date'
      maxDate={moment().subtract(20, 'years')}
      isDarkModeEnabled={isDarkModeEnabled}
      minDate='01-01-1960'
      format={DATE_FORMAT || 'DD/MM/YYYY'}
      androidMode='spinner'
      confirmBtnText='Confirm'
      cancelBtnText='Cancel'
      customStyles={{
        dateIcon: {
          display: 'none'
        }
      }}
      onDateChange={onDateChange}
    />
  )
}

export default DateSelector
