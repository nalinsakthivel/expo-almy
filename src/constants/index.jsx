import { Dimensions, StyleSheet } from "react-native";

export const ScreenWidth = Dimensions.get("window").width;
export const ScreenHeight = Dimensions.get("window").height;

export const colours = {
  Black: "#000000",
  White: "#FFFFFF",
};

export const styless = StyleSheet.create({
  mainContainer: {
flex:1,
backgroundColor:colours.White,
alignItems:'center'
  },
});
