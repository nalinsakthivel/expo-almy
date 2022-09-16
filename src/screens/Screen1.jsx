import { StyleSheet, FlatList, View, Text, Image ,Button,ImageBackground} from "react-native";
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
      `https://fakestoreapi.com/products`
    );

    result = await result.json();
    setData(result);
  };

  const renderItem = ({ item, index }) => (
    <View key={index} style={styles.cardContainer}>
      <Image
        source={{ uri: item.image }}
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

  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
