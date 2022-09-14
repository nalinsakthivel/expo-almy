import { StyleSheet, Text, View ,SafeAreaView} from "react-native";
import React from "react";

import { StatusBar } from "expo-status-bar";

import { ScreenHeight, ScreenWidth } from "../../constants";
import Paragraph from "../Paragraph";

const Header = (props) => {
  return (
    <SafeAreaView style={styles.mainConatiner}>
      <StatusBar style="auto" />
      <Paragraph>index</Paragraph>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainConatiner: {
marginTop:30,
    width: ScreenWidth,
    borderWidth: 1,
    height: ScreenHeight * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
});
