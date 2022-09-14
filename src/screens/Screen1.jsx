import { StyleSheet, FlatList, View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import { colours, ScreenHeight, ScreenWidth, styless } from "../constants";
import Paragraph from "../components/Paragraph";

const Screen1 = () => {
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
      <Paragraph>{item.title}</Paragraph>
    </View>
  );

  const footer =()=>{
    <View style={styles.footerComponent}>
        <Paragraph>The End</Paragraph>
    </View>
  }

  return (
    <View style={styless.mainContainer}>
      <Header>Home</Header>
      <View style={styles.outerContainer}>
        <FlatList data={data} renderItem={renderItem} ListFooterComponent={footer()} />
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
    padding:10,
    marginVertical: 15,
    borderRadius: 5,
   alignItems:'center',
   paddingVertical:5,
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

  },

  footerComponent:{
    
  }
});
