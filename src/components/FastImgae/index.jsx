import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

                                                                                                                                                                                                                                                                                                                                                                                                             

const Images = (props) => {
  return (
    <>
      <Image
        source={{
          uri: props.source,
        }}
        style={[styles.image,props.style]}
      />
    </>
  );
};

export default Images;

const styles = StyleSheet.create({
    image:{ width: 100, height: 100 }
});
