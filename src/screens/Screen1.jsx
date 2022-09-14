import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Header from '../components/Header'
import { styless } from '../constants'

const Screen1 = () => {
  return (
    <View style={styless.mainContainer}>
        <Header>Home</Header>
    </View>
  )
}

export default Screen1

const styles = StyleSheet.create({})