import { StyleSheet, FlatList, View, Text, Image ,Button} from "react-native";
import React, { useEffect, useState,useRef } from "react";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import Header from "../components/Header";
import { colours, ScreenHeight, ScreenWidth, styless } from "../constants";
import Paragraph from "../components/Paragraph";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Screen1 = () => {

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  const [data, setData] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let result = await fetch(
      `http://jsonplaceholder.typicode.com/photos?_start=0&_limit=30`
    );

    result = await result.json();
    setData(result);
  };

  const renderItem = ({ item, index }) => (
    <View key={index} style={styles.cardContainer}>
      <Image
        source={{ uri: "https://picsum.photos/id/1003/3000/2000" }}
        style={styles.Image}
      />
      <Paragraph style={styles.titleText}>{item.title}</Paragraph>
    </View>
  );

  const footer = () => (
    <View style={styles.footerComponent}>
      <Paragraph style={styles.endText}>.. The End ..</Paragraph>
    </View>
  );


  // async function sendPushNotification(expoPushToken) {
  //   const message = {
  //     to: expoPushToken,
  //     sound: 'default',
  //     title: 'Original Title',
  //     body: 'And here is the body!',
  //     data: { someData: 'goes here' },
  //   };
  
  //   await fetch('https://exp.host/--/api/v2/push/send', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Accept-encoding': 'gzip, deflate',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(message),
  //   });
  // }
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  return (
    <View style={styless.mainContainer}>
      <Header>Home</Header>
      <View style={styles.outerContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          ListFooterComponent={footer()}
        />
      </View>
       {/* <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
    </View> */}
    </View>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "center",
  },
  cardContainer: {
    borderWidth: 1,
    width: ScreenWidth * 0.87,
    height: ScreenHeight * 0.3,
    padding: 10,
    marginVertical: 15,
    borderRadius: 10 ,
    alignItems: "center",
    paddingVertical: 5,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 15,
    color: colours.Black,
  },
  Image: {
    width: ScreenWidth * 0.8,
    height: ScreenHeight * 0.2,
    resizeMode: "stretch",
    borderRadius:5
  },

  footerComponent: {
    height: ScreenHeight*0.2,
    alignItems:'center'
  },
  endText:{
    fontWeight:'900'
  },
  titleText:{
    marginTop:10,

  }
});
