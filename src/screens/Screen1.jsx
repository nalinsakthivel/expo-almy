import { StyleSheet, FlatList, View, TouchableOpacity,Modal } from "react-native";
import React, { useEffect, useState, useRef } from "react";

import * as Clipboard from 'expo-clipboard';
import * as Notifications from "expo-notifications";

import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Images from "../components/FastImgae";

import { colours, ScreenHeight, ScreenWidth, styless } from "../constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Screen1 = () => {

  const [copiedText, setCopiedText] = React.useState('');
  const [align, setAlign] = useState(true);
  const [data, setData] = useState();

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response); 
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  

  useEffect(() => { 
    getData();
  },[]);

  const getData = async () => {
    let result = await fetch(`https://fakestoreapi.com/products`);

    result = await result.json();
    setData(result);
  };

  const renderItem1 = ({ item, index }) => (
    <TouchableOpacity key={index} style={styles.cardContainer}>
      <Images source={item.image}  />
      <Paragraph style={styles.titleText}>{item.title}</Paragraph>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.gridContainer} key={index}>
      <Images source={item.image} />
      <Paragraph nol={3}>{item.title}</Paragraph>
    </TouchableOpacity>
  );

  const footer = () => (
    <View style={styles.footerComponent}>
      <Paragraph style={styles.endText}>.. The End ..</Paragraph>
    </View>
  );

  const onAlign = () => {
    [setAlign((align) => !align)];
    // console.log(align);
  };

  return (
    <View style={styless.mainContainer}>
      <Header>Home</Header>
      <View style={styles.alignmentContainer}>
        <TouchableOpacity
          style={styles.alignItem}
          onPress={() => {
            onAlign();
          }}
        >
          {align ? <Paragraph>Grid</Paragraph> : <Paragraph>List</Paragraph>}
        </TouchableOpacity>
      </View>
      {/*just chaeck this..*/}
      <View style={styles.outerContainer}>
        
        {align ? (
          <FlatList
            key={"_"}
            keyExtractor={(item) => "_" + item.id}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={renderItem1}
            ListFooterComponent={footer()}
            
          />
        ) : (
          <FlatList
            key={"#"}
            keyExtractor={(item) => "#" + item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            ListFooterComponent={footer()}
          />
        )}
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
    borderRadius: 10,
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
    borderRadius: 5,
  },

  footerComponent: {
    height: ScreenHeight * 0.28,
    alignItems: "center",
  },
  endText: {
    fontWeight: "900",
  },
  titleText: {
    marginTop: 10,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  alignmentContainer: {
    flexDirection: "row",
    width: ScreenWidth * 0.87,
    alignItems: "center",
    height: 60,

    justifyContent: "space-evenly",
  },
  alignItem: {
    borderWidth: 1,
    borderRadius: 5,
    width: 70,
    alignItems: "center",
    height: 40,
    justifyContent: "space-evenly",
  },
  gridContainer: {
    borderRadius: 5,
    height: ScreenHeight * 0.3,
    width: ScreenWidth * 0.4,
    borderWidth: 1,
    margin: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 5,
  },
});
