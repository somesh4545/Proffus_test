import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

// importing screens
import Home from '../screens/Home.js';

const Drawer = createDrawerNavigator();
const Navigation = () => {
  return (
    <NavigationContainer
      navigationOptions={{
        header: {
          style: {
            elevation: 50,
            shadowOpacity: 10,
          },
        },
      }}>
      <Drawer.Navigator initialRouteName="Home" drawerPosition="right">
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
