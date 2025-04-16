import API from '../../lib/axios-config'
import { HOME } from '../../type'
import { apiUrl } from '../../apiUrl'

export const recommendedList = (params = null) => {
  return dispatch => {
    dispatch({ type: HOME.REQUEST })
    return API.get(apiUrl.CUSTOMER_HOME, { params })
      .then((res) => {
        dispatch({
          type: HOME.SUCCESS,
          data: res.data.data
        })
      })
      .catch((error) => {
        dispatch({
          type: HOME.FAILURE,
          error: error
        })
      })
  }
}
