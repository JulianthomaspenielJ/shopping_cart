import {
  ADDRESSLIST,
  GETMAPADDRESS,
  ADDADDRESS,
  USERDEFAULTADDRESS,
  SETUSERDEFAULTADDRESS,
  DELETEADDRESS,
  GETBYADDRESS,
  UPDATEADDRESS
} from '../../type'

const mapLocationReducer = (state = {}, action) => {
  switch (action.type) {
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
    case ADDADDRESS.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case ADDADDRESS.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        addAddressStatus: action.status
      })
    case ADDADDRESS.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        addAddressError: action.error
      })
    case GETBYADDRESS.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case GETBYADDRESS.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        getByAddressData: action.data ? action.data : null
      })
    case GETBYADDRESS.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        addAddressError: action.error
      })
    case ADDRESSLIST.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case ADDRESSLIST.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        getAddressList: action.data ? action.data.data : null
      })
    case ADDRESSLIST.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case USERDEFAULTADDRESS.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case USERDEFAULTADDRESS.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        getDefaultAddress: action.data ? action.data.data[0] : null
      })
    case USERDEFAULTADDRESS.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case SETUSERDEFAULTADDRESS.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case SETUSERDEFAULTADDRESS.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        setDefaultAddressStatus: action.data ? action.data : null
      })
    case SETUSERDEFAULTADDRESS.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case UPDATEADDRESS.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case UPDATEADDRESS.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        updateAddressStatus: action.status
      })
    case UPDATEADDRESS.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        updateAddressError: action.error
      })
    case DELETEADDRESS.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case DELETEADDRESS.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        deleteAddress: action.data ? action.data : null
      })
    case DELETEADDRESS.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        deleteAddressError: action.error
      })
    case ADDADDRESS.CLEAR:
      return Object.assign({}, state, {
        loading: false,
        addAddressStatus: null,
        addAddressError: null,
        setDefaultAddress: null,
        deleteAddress: null,
        mapCurrentAddress: null,
        getDefaultAddress: null,
        getByAddressData: null,
        updateAddressError: null,
        updateAddressStatus: null
      })
    case GETBYADDRESS.CLEAR:
      return Object.assign({}, state, {
        loading: false,
        getByAddressData: null
      })
    default:
      return state
  }
}

export default mapLocationReducer
