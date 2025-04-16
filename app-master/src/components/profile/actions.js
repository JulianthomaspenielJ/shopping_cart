import API from '../../lib/axios-config'
import {
  GETPROFILE,
  GETFOODTYPES,
  GETCUISINES,
  PROFILEUPDATE,
  DOCUMENT_UPLOAD,
  OTHER_DOCUMENT_UPLOAD,
  IMAGE_UPLOAD,
  GETMEALTYPE
} from '../../type'
import { apiUrl } from '../../apiUrl'
import { RESPONSE_MSG } from '../../lib/const'

const headerData = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'multipart/form-data;charset=UTF-8'
}
export const getProfile = () => {
  return dispatch => {
    dispatch({ type: GETPROFILE.REQUEST })
    return API.post(apiUrl.PROFILE, {})
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: GETPROFILE.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: GETPROFILE.SUCCESS,
            data: res.data,
            status: res.data.status
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: GETPROFILE.FAILURE,
          error: error
        })
      })
  }
}
export const getCuisines = (data) => {
  const url = `${apiUrl.GETCUISINES}?status=${data.status}`
  return dispatch => {
    dispatch({ type: GETCUISINES.REQUEST })
    return API.get(url, {})
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: GETCUISINES.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: GETCUISINES.SUCCESS,
            data: res.data,
            status: res.data.status
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: GETCUISINES.FAILURE,
          error: error
        })
      })
  }
}
export const getFoodtypes = (data) => {
  const url = `${apiUrl.GETFOODTYPES}?status=${data.status}`
  return dispatch => {
    dispatch({ type: GETFOODTYPES.REQUEST })
    return API.get(url, {})
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: GETFOODTYPES.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: GETFOODTYPES.SUCCESS,
            data: res.data,
            status: res.data.status
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: GETFOODTYPES.FAILURE,
          error: error
        })
      })
  }
}
export const profileUpdate = (data, page = null) => {
  return dispatch => {
    dispatch({ type: PROFILEUPDATE.REQUEST })
    return API.put(apiUrl.PROFILE, data)
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: PROFILEUPDATE.FAILURE,
            status: res.data.status,
            message: res.data.message,
            page: page
          })
        } else {
          dispatch({
            type: PROFILEUPDATE.SUCCESS,
            status: res.data.status,
            data: res.data,
            page: page
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: PROFILEUPDATE.FAILURE,
          error: error,
          page: page
        })
      })
  }
}
export const imageUpload = (data) => {
  return dispatch => {
    dispatch({ type: IMAGE_UPLOAD.REQUEST })
    return API.put(apiUrl.PROFILE, data)
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: IMAGE_UPLOAD.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: IMAGE_UPLOAD.SUCCESS,
            status: res.data.status,
            data: res.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: IMAGE_UPLOAD.FAILURE,
          error: error
        })
      })
  }
}
export const uploadDocument = (formData, authToken) => {
  headerData['x-auth-token'] = authToken
  return dispatch => {
    dispatch({ type: DOCUMENT_UPLOAD.REQUEST })
    fetch(apiUrl.PROFILEPICTURE, {
      body: formData,
      method: 'POST',
      headers: headerData
    }
    ).then(res => res.json())
      .then(res => {
        if (res.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: DOCUMENT_UPLOAD.FAILURE,
            status: res.status
          })
        } else {
          dispatch({
            type: DOCUMENT_UPLOAD.SUCCESS,
            status: res.status,
            data: res
          })
        }
      }).catch((error) => {
        dispatch({
          type: DOCUMENT_UPLOAD.FAILURE,
          error: error,
          status: 'error'
        })
      }).done()
  }
}
export const uploadOtherDocument = (formData, documentName=null, fileName, authToken) => {
  headerData['x-auth-token'] = authToken
  return dispatch => {
    dispatch({ type: OTHER_DOCUMENT_UPLOAD.REQUEST })
    fetch(apiUrl.DOCUMENTUPLOAD, {
      body: formData,
      method: 'POST',
      headers: headerData
    }
    ).then(res => res.json())
      .then(res => {
        if (res.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: OTHER_DOCUMENT_UPLOAD.FAILURE,
            status: res.status
          })
        } else {
          dispatch({
            type: OTHER_DOCUMENT_UPLOAD.SUCCESS,
            status: res.status,
            data: res,
            documentName: documentName,
            fileName: fileName
          })
        }
      }).catch((error) => {
        dispatch({
          type: OTHER_DOCUMENT_UPLOAD.FAILURE,
          error: error
        })
      }).done()
  }
}
export const getMealType = (data) => {
  const url = `${apiUrl.GETMEALTYPES}?status=${data.status}`
  return dispatch => {
    dispatch({ type: GETMEALTYPE.REQUEST })
    return API.get(url, {})
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: GETMEALTYPE.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: GETMEALTYPE.SUCCESS,
            data: res.data,
            status: res.data.status
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: GETMEALTYPE.FAILURE,
          error: error
        })
      })
  }
}
