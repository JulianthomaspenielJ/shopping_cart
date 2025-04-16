import { TRANSCATION_LIST, UPDATEWALLET, WITHDRAW, WITHDRAWLIST } from '../../type'

const walletReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSCATION_LIST.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case TRANSCATION_LIST.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        transcationsData: action.data
      })
    case TRANSCATION_LIST.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case UPDATEWALLET.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case UPDATEWALLET.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        checkUpdateWallet: action.data
      })
    case UPDATEWALLET.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case WITHDRAW.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case WITHDRAW.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        checkWithdrawWallet: action.data
      })
    case WITHDRAW.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case WITHDRAWLIST.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case WITHDRAWLIST.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        withdrawtranscationsData: action.data
      })
    case WITHDRAWLIST.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case UPDATEWALLET.CLEAR:
      return Object.assign({}, state, {
        loading: false,
        checkUpdateWallet: null,
        checkWithdrawWallet: null
      })
    default:
      return state
  }
}

export default walletReducer
