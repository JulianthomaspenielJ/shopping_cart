import {
  CONFIG,
  CURRENTTIME,
  CONFIG_AREA
} from '../../type'

const configReducer = (state = {}, action) => {
  switch (action.type) {
    case CONFIG.CONFIG_REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case CONFIG.CONFIG_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        appConfig: action.appConfig
      })
    case CONFIG.CONFIG_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case CONFIG_AREA.CONFIG_AREA_REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case CONFIG_AREA.CONFIG_AREA_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        appConfigArea: action.appConfigArea
      })
    case CONFIG_AREA.CONFIG_AREA_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case CURRENTTIME.CURRENTTIME_REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case CURRENTTIME.CURRENTTIME_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        currentDateTime: action.data.data
      })
    case CURRENTTIME.CURRENTTIME_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case CONFIG.CONFIG_CLEAR:
      return Object.assign({}, state, {
        loading: false,
        appConfig: null
      })
    default:
      return state
  }
}

export default configReducer
