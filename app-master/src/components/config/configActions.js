import API from '../../lib/axios-config'
import {
  CONFIG,
  CURRENTTIME,
  CONFIG_AREA
} from '../../type'
import { apiUrl } from '../../apiUrl'

export const getAppConfig = (reqData) => {
  return dispatch => {
    dispatch({ type: CONFIG.CONFIG_REQUEST })
    API.post(apiUrl.APP_CONFIG, reqData)
      .then((res) => {
        const { data } = res
        dispatch({
          type: CONFIG.CONFIG_SUCCESS,
          status: data.status,
          appConfig: data.data
        })
      })
      .catch((error) => {
        dispatch({
          type: CONFIG.CONFIG_FAILURE,
          error: error
        })
      })
  }
}

export const getAppConfigAreas = () => {
  return dispatch => {
    dispatch({ type: CONFIG_AREA.CONFIG_AREA_REQUEST })
    API.post(apiUrl.APP_CONFIG_AREA)
      .then((res) => {
        const { data } = res
        dispatch({
          type: CONFIG_AREA.CONFIG_AREA_SUCCESS,
          status: data.status,
          appConfigArea: data.data
        })
      })
      .catch((error) => {
        dispatch({
          type: CONFIG_AREA.CONFIG_AREA_FAILURE,
          error: error
        })
      })
  }
}

export const getCurrentTime = () => {
  return dispatch => {
    dispatch({ type: CURRENTTIME.CURRENTTIME_REQUEST })
    const url = `${apiUrl.CURRENTDATETIME}`
    return API.get(url, {})
      .then((res) => {
        dispatch({
          type: CURRENTTIME.CURRENTTIME_SUCCESS,
          data: res.data
        })
      })
      .catch((error) => {
        dispatch({
          type: CURRENTTIME.CURRENTTIME_FAILURE,
          error: error
        })
      })
  }
}
