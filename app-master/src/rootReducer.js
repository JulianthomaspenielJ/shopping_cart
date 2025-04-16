import { combineReducers } from 'redux'
import loginReducer from './components/user-login/loginReducer'
import configReducer from './components/config/configReducer'
import customerHomeReducer from './components/user-landing/reducer'
import customerBookReducer from './components/booking/reducer'
import welcomCookReducer from './components/welcome-cook/reducer'
import userMyBookingReducer from './components/user-bookings/reducer'
import profileReducer from './components/profile/reducer'
import walletReducer from './components/cook-wallet/reducer'
import mapLocationReducer from './components/location/reducer'
import customerSupportReducer from './components/customer-support/reducer'

export default combineReducers({
  loginReducer,
  configReducer,
  customerHomeReducer,
  customerBookReducer,
  welcomCookReducer,
  userMyBookingReducer,
  profileReducer,
  walletReducer,
  mapLocationReducer,
  customerSupportReducer
})
