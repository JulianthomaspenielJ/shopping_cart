import AsyncStorage from '@react-native-community/async-storage'

export const setData = async (key, value) => {
  const data = await AsyncStorage.setItem(key, value)
  return data
}

export const getData = async (key) => {
  const data = await AsyncStorage.getItem(key)
  return data
}

export const removeData = async (key) => {
  const data = await AsyncStorage.removeItem(key)
  return data
}
