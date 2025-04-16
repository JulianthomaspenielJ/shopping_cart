import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform
} from 'react-native'
import { supportMenu } from '../../assets/styles/supportMenuStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import { notificationStyle } from '../../assets/styles/notificationStyle'

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 10 : StatusBar.currentHeight

const ViewNotification = (props) => {
  const menu = [
    {
      id: '1',
      title: 'coupon code',
      time: '09.00 am',
      date: '12.03.2020',
      message: 'VEGGIE50%. Please use the code before 12.July. 2020.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac porttitor tellus loremtell us nunc risus.'
    }
  ]
  const { navigation } = props
  const backToLogin = () => {
    navigation.navigate('Notification')
  }
  return (
    <View style={[supportMenu.container, { padding: 25 }]}>
      {Platform.OS === 'ios' && (
        <>
          <View style={{ height: STATUS_BAR_HEIGHT }}>
            <StatusBar
              translucent
              backgroundColor='white'
              barStyle='dark-content'
            />
          </View>
        </>
      )}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
      >
        <TouchableOpacity
          onPress={backToLogin}
        >
          <Icon name='ios-arrow-back' size={24} style={supportMenu.arrowBack} />
        </TouchableOpacity>
        <View />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 20,
          marginTop: 30
        }}
      >
        <Text style={notificationStyle.notificationTitle}>Notifications</Text>
        <View />
      </View>
      <View>
        <ScrollView
          style={{
            height: '85%'
          }}
          showsVerticalScrollIndicator={false}
        >
          {menu.map((item, index) => {
            return (
              <View
                key={index}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%'
                  }}
                >
                  <TouchableOpacity
                    style={notificationStyle.notificationContainer}
                  >
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}
                    >
                      <View>
                        <Text style={notificationStyle.titleName}>{item.title}</Text>
                      </View>
                      <View style={{
                        flexDirection: 'row'
                      }}
                      >
                        <Text style={[notificationStyle.titleName, { fontSize: 11, paddingRight: 2 }]}>{item.date},</Text>
                        <Text style={[notificationStyle.titleName, { fontSize: 11, textTransform: 'none' }]}>{item.time}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={notificationStyle.titleMsg}>{item.message}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>)
          })}
        </ScrollView>
      </View>
    </View>
  )
}

export default ViewNotification
