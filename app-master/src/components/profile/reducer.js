import {
  GETPROFILE,
  GETCUISINES,
  GETFOODTYPES,
  PROFILEUPDATE,
  DOCUMENT_UPLOAD,
  OTHER_DOCUMENT_UPLOAD,
  IMAGE_UPLOAD,
  GETMAPADDRESS,
  GETMEALTYPE
} from '../../type'

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case GETPROFILE.LOADING:
      return Object.assign({}, state, {
        loading: true
      })
    case GETPROFILE.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case GETPROFILE.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        profileData: action.data ? action.data.data : null
      })
    case GETPROFILE.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case GETCUISINES.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case GETCUISINES.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        cuisineData: action.data ? action.data.data : null
      })
    case GETCUISINES.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case GETFOODTYPES.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case GETFOODTYPES.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        foodtypesData: action.data ? action.data.data : null
      })
    case GETFOODTYPES.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case PROFILEUPDATE.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case PROFILEUPDATE.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        profileupdateStatus: action.status,
        profileData: action.data ? action.data.data : null,
        page: action.page
      })
    case PROFILEUPDATE.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
        page: action.page
      })
    case IMAGE_UPLOAD.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case IMAGE_UPLOAD.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        profileUploadStatus: action.status
      })
    case IMAGE_UPLOAD.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        documetUploaderror: action.error
      })
    case IMAGE_UPLOAD.CLEAR:
      return Object.assign({}, state, {
        loading: false,
        documetUploaderror: '',
        profileUploadStatus: ''
      })
    case DOCUMENT_UPLOAD.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case DOCUMENT_UPLOAD.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        documetUploadData: action.data ? action.data.data : null,
        documetUploadStatus: action.status,
        documentName: action.documentName ? action.documentName : null
      })
    case DOCUMENT_UPLOAD.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        documetUploaderror: action.error
      })
    case DOCUMENT_UPLOAD.CLEAR:
      return Object.assign({}, state, {
        loading: false,
        documetUploadStatus: null,
        documetUploaderror: null
      })
    case OTHER_DOCUMENT_UPLOAD.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case OTHER_DOCUMENT_UPLOAD.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        otherdocumetUploadData: action.data ? action.data.data : null,
        otherdocumetUploadStatus: action.status,
        otherfileName: action.fileName ? action.fileName : null,
        otherdocumentName: action.documentName ? action.documentName : null
      })
    case OTHER_DOCUMENT_UPLOAD.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case OTHER_DOCUMENT_UPLOAD.CLEAR:
      return Object.assign({}, state, {
        loading: false,
        otherdocumetUploadStatus: null
      })
    case GETMAPADDRESS.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case GETMAPADDRESS.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        mapCurrentAddress: action.data ? action.data : null
      })
    case GETMAPADDRESS.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case GETMEALTYPE.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        mealTypeData: action.data ? action.data.data : null
      })
    case GETMEALTYPE.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case GETPROFILE.CLEAR:
      return Object.assign({}, state, {
        loading: false,
        profileData: null
      })
    case PROFILEUPDATE.CLEAR:
      return Object.assign({}, state, {
        loading: false,
        foodtypesData: null,
        cuisineData: null,
        profileupdateStatus: null,
        documetUploadData: null,
        documetUploadStatus: null,
        otherdocumetUploadData: null,
        otherdocumetUploadStatus: null,
        otherdocumentName: null,
        otherfileName: null,
        page: null
      })
    default:
      return state
  }
}

export default profileReducer
