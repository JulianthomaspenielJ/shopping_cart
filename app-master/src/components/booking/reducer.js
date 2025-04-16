import {
  BOOKING,
  SUMMARY,
  CHECKOUT,
  COOKCANCEL,
  PENDING_REVIEW,
  QUICK_BOOK,
  UPDATE_ORDER,
  COUPON,
  CREATERAZORORDER,
  UPDATE_SUBORDER
} from '../../type'

const customerBookReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case BOOKING.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        bookingConfigData: action.data ? action.data.data : null
      })
    case BOOKING.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case BOOKING.BOOKING_SELECTED_COOK_DATA:
      return Object.assign({}, state, {
        selctedCookData: action.selctedCookData ? action.selctedCookData : null
      })
    case BOOKING.BOOKING_SELECTED_COOK_DATA_CLEAR:
      return Object.assign({}, state, {
        selctedCookData: null
      })
    case SUMMARY.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case SUMMARY.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        summaryData: action.data ? action.data.data.total : null,
        summaryStatus: '',
        summaryErrMsg: '',
        summaryDataValueChanged: action.data ? action.data.data.total : null,
        summaryReceivedMsg: true
      })
    case SUMMARY.ADDONREQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case SUMMARY.ADDONSUCCESS:
      return Object.assign({}, state, {
        loading: false,
        addonsummaryData: action.data ? action.data.data.total : null,
        mealName: action.mealName ? action.mealName : null
      })
    case SUMMARY.ADDONFAILURE:
      return Object.assign({}, state, {
        summaryStatus: action.status,
        summaryErrMsg: action.message,
        loading: false
      })
    case SUMMARY.CLEAR_ADDON_SUMMARY_VALUE:
      return Object.assign({}, state, {
        loading: false,
        addonsummaryData: null,
        mealName: null
      })
    case SUMMARY.SUMMARY_STATE_DATA:
      return Object.assign({}, state, {
        loading: false,
        bookingSummaryData: action.bookingSummaryData ? action.bookingSummaryData : null
      })
    case SUMMARY.CLEAR_SUMMARY_VALUE:
      return Object.assign({}, state, {
        loading: false,
        summaryData: 0,
        addonsummaryData: null,
        mealName: null
      })
    case SUMMARY.BOOKING_SUMMARY_REQUEST:
      return Object.assign({}, state, {
        summaryRequest: action.summaryRequest ? action.summaryRequest : null
      })
    case SUMMARY.FAILURE:
      return Object.assign({}, state, {
        summaryStatus: action.status,
        summaryErrMsg: action.message,
        loading: false
      })
    case SUMMARY.CLEAR:
      return Object.assign({}, state, {
        summaryStatus: '',
        summaryErrMsg: ''
      })
    case CHECKOUT.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case CHECKOUT.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        checkoutStatus: action.status,
        checkoutData: action.data ? action.data.data : null,
        checkoutErrMsg: action.message
      })
    case COOKCANCEL.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case SUMMARY.RECEIVED:
      return Object.assign({}, state, {
        summaryDataValueChanged: 1,
        summaryReceivedMsg: false
      })
    case COOKCANCEL.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        cancelorder: action.data ? action.data : null
      })
    case COOKCANCEL.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case PENDING_REVIEW.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        pendingReview: action.pendingReview
      })
    case QUICK_BOOK.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        comboData: action.comboData
      })
    case UPDATE_ORDER.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case UPDATE_ORDER.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        completedStatus: action.status
      })
    case UPDATE_ORDER.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case UPDATE_ORDER.CLEAR:
      return Object.assign({}, state, {
        completedStatus: '',
        loading: false,
      })
    case UPDATE_SUBORDER.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case UPDATE_SUBORDER.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        completedSubOrderStatus: action.status
      })
    case UPDATE_SUBORDER.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case UPDATE_SUBORDER.CLEAR:
      return Object.assign({}, state, {
        completedStatus: '',
        loading: false,
      })
    case CHECKOUT.CLEAR:
      return Object.assign({}, state, {
        checkoutStatus: null,
        bookingSummaryData: null,
        summaryRequest: null,
        summaryData: null,
        cancelorder: null
      })
    case COUPON.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case COUPON.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        offerData: action.data ? action.data.data : null,
        couponStatus: action.status
      })
    case COUPON.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        couponStatus: action.status,
        couponErrMsg: action.message
      })
    case COUPON.CLEAR:
      return Object.assign({}, state, {
        loading: false,
        offerData: null
      })
    case COUPON.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case CREATERAZORORDER.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })    
    case CREATERAZORORDER.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        razorOrderData: action.data ? action.data.data : null,
        razorOrderStatus: action.status,
        razorOrderStatusPage: action.page
      })
    case CREATERAZORORDER.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        razorOrderStatus: action.status,
        razorOrderErrMsg: action.message,
        razorOrderStatusPage: action.page
      })
    case CREATERAZORORDER.CLEAR:
      return Object.assign({}, state, {
        loading: false,
        razorOrderData: null,
        razorOrderStatus: null,
        razorOrderErrMsg: null
      })
    default:
      return state
  }
}

export default customerBookReducer
