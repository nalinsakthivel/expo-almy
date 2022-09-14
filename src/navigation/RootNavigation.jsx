import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Screen1 from '../screens/Screen1';

const RootNavigation = () => { 

const stack = createNativeStackNavigator()

  return (
    <stack.Navigator screenOptions={{
        headerShown:false
    }}>
        <stack.Screen name='screen1' component={Screen1}/>
    </stack.Navigator>
  )
}

export default RootNavigation

const styles = StyleSheet.create({})