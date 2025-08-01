module.exports = {
  rupee: '\u20B9',
  REGEX: {
    EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    DOB: /^\d{2}[./-]\d{2}[./-]\d{4}$/,
    PHONE: /^[0-9]{10}$/,
    PINCODE: /^[0-9]{6}$/,
    ACC_NO: /[0-9]{9,18}/,
    IFSC_CODE: /^[A-Za-z]{1,4}[a-zA-Z0-9]{1,7}$/,
    AMOUNT: /^[0-9\b]+$/,
    TEXTONLY: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/
  },
  COOK_STATUS: {
    ON: 'On',
    OFF: 'Off'
  },
  SESSION: {
    TOKEN: 'token',
    EXPIRED: 'session_expired',
    EXPIRED_ERROR_CODE: 310
  },
  HEADER: {
    CONTENT: 'Content-Type',
    TOKEN: 'x-auth-token',
    CONTENT_TYPE: 'application/json',
    TIMEOUT: 30000
  },
  FORMAT: {
    DATE: 'DD/MM/YYYY',
    DOB: 'DD-MM-YYYY',
    TIME: 'LT'
  },
  KEY: {
    USER_TYPE: 'USER_TYPE',
    COVID: 'COVID',
    SELECTED_LANGUAGE: 'lng_selected',
    GUEST_USER: 'GUEST'
  },
  USER: 'CUSTOMER',
  COOK: 'WORKER',
  GUEST: 'GUEST',
  STATUS: {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
  },
  OTP: {
    INVALID_OTP: 'Invalid otp'
  },
  LOGIN_TYPE: {
    SIGN_UP: 'SIGN_UP',
    LOGIN: 'LOGIN'
  },
  RESPONSE_MSG: {
    SUCCESS: 'ok',
    ERROR: 'error'
  },
  DATE_TYPE: {
    FROM: 'FROM',
    TO: 'TO'
  },
  PAGE: {
    HOME: 'HOME',
    CHECKOUT: 'CHECKOUT',
    DETAIL: 'DETAIL',
    LOGOUT: 'LOGOUT',
    BOOK: 'BOOK',
    QUICK_BOOK: 'QUICK_BOOK',
    USER_LOGIN: 'USER_LOGIN',
    RECOMMENDED: 'RECOMMENDED',
    ALL: 'ALL',
    MYBOOKING: 'MYBOOKING',
    PASTBOOKING: 'PASTBOOKING',
    TODAYEARNING: 'TODAYEARNING',
    WEEKLYEARNING: 'WEEKLYEARNING',
    CURRENTORDER: 'CURRENTORDER',
    PASTORDER: 'PASTORDER',
    ADDRESSLIST: 'ADDRESSLIST',
    GOOGLEMAP: 'GOOGLEMAP',
    COOKDIRECTION: 'COOKDIRECTION',
    COOKALLRECCOMMENDED: 'COOK ALL RECOMMENDED',
    SEARCH: 'CUISINESEARCH',
    USERLANDING: 'USERLANDING',
    ADDRESSSEARCH: 'ADDRESSSEARCH',
    ORDERDETAIL: 'ORDERDETAIL',
    WALLET: 'WALLET',
    PROFILE: 'PROFILE',
    CUSTOMERSUPPORT: 'CUSTOMERSUPPORT'
  },
  PLATFORM: {
    ANDROID: 'ANDROID',
    IOS: 'IOS'
  },
  MSG: {
    MOBILE_NUMBER_ERR_MSG: 'Please enter valid mobile number.',
    PLAY_SERVICE_NOT_AVAILABLE: 'Google Play services not available.',
    SERVER_ERROR: 'server_error.try_again',
    OTP_ERROR: 'Pease enter valid OTP.',
    NO_RECORDS_FOUND: 'server_error.no_records_found',
    USERINACTIVE: 'server_error.inactive_user',
    OTPEXPIRED: 'server_error.otp.expired',
    OTPINVALID: 'server_error.otp.invalid',
    INSUFFICIENTFUND: 'server_error.insufficient_wallet_amount',
    ALREADYACCEPTED: 'server_error.already_accepted',
    UNABLE_CREATE_USER: 'server_error.otp.unable_to_create_user',
    ALREADY_RESCHEDULED: 'server_error.already_rescheduled'
  },
  SOCIAL_TYPE: {
    GOOGLE: 'GOOGLE',
    FACEBOOK: 'FACEBOOK',
    IOS: 'IOS'
  },
  TYPE_RECOMMENDED: {
    RECOMMENDED: 'RECOMMENDED',
    ALL: 'ALL'
  },
  EVENT_CAT: {
    NAV: 'NAVIGATION',
    SELECTION: 'SELECTION',
    ACTION: 'ACTION'
  },
  GENDER: {
    MALE: 'MALE',
    FEMALE: 'FEMALE'
  },
  BOOKING: {
    CONFIG: 'CONFIG',
    CHANGE: 'CHANGE',
    NOSLOTS: 'NO SLOTS AVAILABLE',
    SLOT_TIME: 'SLOT TIME',
    SLOT_END_TIME: 'TO TIME',
    SUMMARY_STATE_DATA: 'SUMMARY_STATE_DATA',
    CLEAR_SUMMARY_VALUE: 'CLEAR_SUMMARY_VALUE',
    CLEAR: 'CLEAR',
    BOOKING_SUMMARY_REQUEST: 'BOOKING_SUMMARY_REQUEST',
    BOOKING_SELECTED_COOK_DATA_CLEAR: 'BOOKING_SELECTED_COOK_DATA_CLEAR',
    TODAY: 'TODAY',
    WEEK: 'WEEK'
  },
  CHECKOUT: {
    CLEAR: 'CHECKOUT_CLEAR'
  },
  WELCOMECOOK: {
    NOTIFICATION: 'NOTIFICATION',
    NORECORD: 'You dont have any requests yet.',
    NOORDER: 'You dont have any orders.',
    CLEAR: 'WELCOMECOOK_CLEAR'
  },
  ENUMSTATUS: {
    ACCEPTED: 'ACCEPTED',
    NEW: 'NEW',
    REJECTED: 'REJECTED',
    REQUEST_IN_PROGRESS: 'REQUEST_IN_PROGRESS',
    REQUEST_CANCELLED: 'REQUEST_CANCELLED',
    CANCELLED: 'CANCELLED',
    REQUEST_NOT_ACCEPTED: 'REQUEST_NOT_ACCEPTED',
    COMPLETED: 'COMPLETED',
    REQUEST_COMPLETED: 'REQUEST_COMPLETED',
    PAID: 'PAID',
    ARRIVED: 'ARRIVED',
    RESCHEDULED: 'RESCHEDULED',
    JOBSTARTED: 'JOBSTARTED',
    JOBEND: 'JOBEND'
  },
  STATUSVALUE: {
    REQUEST_IN_PROGRESS: 'IN PROGRESS',
    REQUEST_CANCELLED: 'CANCELLED',
    REQUEST_NOT_ACCEPTED: 'NOT ACCEPTED',
    CANCELLED: 'CANCELLED',
    ACCEPTED: 'ACCEPTED',
    NEW: 'NEW',
    REJECTED: 'REJECTED',
    COMPLETED: 'COMPLETED',
    RESCHEDULED: 'RESCHEDULED',
    REQUEST_COMPLETED: 'REQUEST COMPLETED',
    JOBSTARTED: 'JOBSTARTED',
    JOBEND: 'JOBEND'
  },
  PAYMENTSTATUSVALUE: {
    PAY_IN: 'COMMISION PAID',
    REFUND: 'REFUND',
    DEPOSIT: 'DEPOSIT',
    WITHDRAW: 'WITHDRAW',
    ADMIN_PAY_OUT: 'Pay Out',
    ADMIN_PAY_IN: 'Amount Added',
    EARNINGS: 'Earnings'
  },
  ORDER: {
    ORDER: 'ORDER',
    CURRENT: 'CURRENT',
    PAST: 'PAST',
    NORECORD: 'No order found!'
  },
  PROFILE: {
    PROFILE: 'PROFILE',
    CUISINE: 'CUISINE',
    FOODTYPE: 'FOODTYPE',
    MEALTYPE: 'MEALTYPE',
    CLEAR: 'GET_PROFILE_CLEAR',
    UPDATECLEAR: 'CLEAR'
  },
  PROFILEUPDATE: {
    CLEAR: 'PROFILEUPDATE_CLEAR'
  },
  ONLINESTATUS: {
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE',
    REVIEW: 'IN_REVIEW',
    INACTIVE: 'INACTIVE',
    NEW: 'NEW'
  },
  DOCUMENT_UPLOAD: {
    CLEAR: 'CLEAR'
  },
  OTHER_DOCUMENT_UPLOAD: {
    CLEAR: 'CLEAR'
  },
  IMAGE_UPLOAD: {
    CLEAR: 'CLEAR'
  },
  UPLOAD: {
    DOCUMENT: 'DOCUMENT',
    PROFILE: 'PROFILE'
  },
  GET_STORAGE: 'dataCollection',
  ITEM_STATUS: {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE'
  },
  USERTYPE: 'USERTYPE',
  ADDRESSCLEAR: {
    CLEAR: 'PROFILEUPDATE_CLEAR'
  },
  NOTIFICATIONSTATUS: {
    ON: 'ON',
    OFF: 'OFF'
  }
}
