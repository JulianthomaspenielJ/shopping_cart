import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge'

const tracker = new GoogleAnalyticsTracker('UA-123841590-1')

const screenViewed = (name) => {
  tracker.trackScreenView(name)
}

const eventTriggered = (category, action) => {
  tracker.trackEvent(category, action)
}

export {
  screenViewed,
  eventTriggered
}
