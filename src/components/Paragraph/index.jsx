import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Paragraph = (props) => {
  return <Text style={styles.text}>{props.children}</Text>;
};

export default Paragraph;

const styles = StyleSheet.create({
text:{
    
}
});
