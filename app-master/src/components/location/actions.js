import API from '../../lib/axios-config'
import {
  GETMAPADDRESS,
  ADDADDRESS,
  ADDRESSLIST,
  USERDEFAULTADDRESS,
  SETUSERDEFAULTADDRESS,
  GETBYADDRESS,
  UPDATEADDRESS,
  DELETEADDRESS
} from '../../type'
import { apiUrl } from '../../apiUrl'
import { RESPONSE_MSG } from '../../lib/const'
import { GOOGLE_API_KEY } from 'react-native-dotenv'

export const getMapCurrentAddress = (param) => {
  return dispatch => {
    dispatch({ type: GETMAPADDRESS.REQUEST })
    const url = `${apiUrl.GETLATLANG}?address=${param}&key=${GOOGLE_API_KEY}`
    fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0) {
          dispatch({
            type: GETMAPADDRESS.SUCCESS,
            data: res.results
          })
        }
      }).catch((error) => {
        dispatch({
          type: GETMAPADDRESS.FAILURE,
          error: error
        })
      }).done()
  }
}
export const addAddress = (data) => {
  return dispatch => {
    dispatch({ type: ADDADDRESS.REQUEST })
    return API.post(apiUrl.ADDADDRESS, data)
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: ADDADDRESS.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: ADDADDRESS.SUCCESS,
            status: res.data.status
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: ADDADDRESS.FAILURE,
          error: error
        })
      })
  }
}

export const AddressList = (data) => {
  return dispatch => {
    dispatch({ type: ADDRESSLIST.REQUEST })
    return API.post(apiUrl.ADDRESSESLIST, data)
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: ADDRESSLIST.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: ADDRESSLIST.SUCCESS,
            data: res.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: ADDRESSLIST.FAILURE,
          error: error
        })
      })
  }
}

export const userDefaultAddress = (data) => {
  return dispatch => {
    dispatch({ type: USERDEFAULTADDRESS.REQUEST })
    return API.post(`${apiUrl.ADDRESSESLIST}?isdefault=1`, data)
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: USERDEFAULTADDRESS.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: USERDEFAULTADDRESS.SUCCESS,
            data: res.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: USERDEFAULTADDRESS.FAILURE,
          error: error
        })
      })
  }
}
export const setAddressUserDefault = (addressid, data) => {
  return dispatch => {
    dispatch({ type: SETUSERDEFAULTADDRESS.REQUEST })
    // const url = 'http://localhost:4000/api/v1/addresses'
    // apiUrl.ADDADDRESS
    return API.put(`${apiUrl.ADDADDRESS}/${addressid}`, data)
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: SETUSERDEFAULTADDRESS.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: SETUSERDEFAULTADDRESS.SUCCESS,
            data: res.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: SETUSERDEFAULTADDRESS.FAILURE,
          error: error
        })
      })
  }
}
export const getMapCurrentAddressByPlaceId = (placeId) => {
  return dispatch => {
    dispatch({ type: GETMAPADDRESS.REQUEST })
    const url = `${apiUrl.GETADDRESSBYPLACEID}?placeid=${placeId}&key=${GOOGLE_API_KEY}`
    fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.result && res.result.address_components.length > 0) {
          dispatch({
            type: GETMAPADDRESS.SUCCESS,
            data: res.result
          })
        }
      }).catch((error) => {
        dispatch({
          type: GETMAPADDRESS.FAILURE,
          error: error
        })
      }).done()
  }
}

export const getByAddress = (id) => {
  return dispatch => {
    dispatch({ type: GETBYADDRESS.REQUEST })
    const url = `${apiUrl.ADDADDRESS}/${id}`
    // const url = 'http://localhost:4000/api/v1/addresses/'+id
    return API.get(url, {})
      .then((res) => {
        const { data } = res
        if (data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: GETBYADDRESS.FAILURE,
            status: data.status,
            message: data.message
          })
        } else {
          dispatch({
            type: GETBYADDRESS.SUCCESS,
            data: data.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: GETBYADDRESS.FAILURE,
          error: error
        })
      })
  }
}
export const updateAddress = (data, id) => {
  return dispatch => {
    dispatch({ type: UPDATEADDRESS.REQUEST })
    const url = `${apiUrl.ADDADDRESS}/${id}`
    // const url = 'http://localhost:4000/api/v1/addresses/'+id
    return API.put(url, data)
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: UPDATEADDRESS.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: UPDATEADDRESS.SUCCESS,
            status: res.data.status
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: ADDADDRESS.FAILURE,
          error: error
        })
      })
  }
}
export const deleteTheAddress = (addressid) => {
  return dispatch => {
    dispatch({ type: DELETEADDRESS.REQUEST })
    return API.delete(`${apiUrl.ADDADDRESS}/${addressid}`,  { data: {} })
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: DELETEADDRESS.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: DELETEADDRESS.SUCCESS,
            data: res.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: DELETEADDRESS.FAILURE,
          error: error
        })
      })
  }
}
