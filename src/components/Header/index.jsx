import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ScreenHeight, ScreenWidth } from "../../constants";
import Paragraph from "../Paragraph";

const Header = (props) => {
  return (
    <SafeAreaView style={styles.mainConatiner}>
      <StatusBar style="auto" />
      <View>
        {props.back ? (
          <TouchableOpacity>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <Ionicons name="logo-react" size={24} color="black" />
        )}
      </View>
      <View style={styles.headingText}>
        <Paragraph style={styles.title}>{props.children}</Paragraph>
      </View>
      <TouchableOpacity>
        <Ionicons name="exit-outline" size={24} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainConatiner: {
    marginTop: 30,
    width: ScreenWidth,

    height: ScreenHeight * 0.1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
  },
  headingText: {
    width: ScreenWidth * 0.7,
    alignItems: "center",
  },
});
