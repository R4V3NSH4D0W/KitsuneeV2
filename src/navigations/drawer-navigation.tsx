import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Article from '../menuItems/Article';
import HomePage from '../screens/home-page';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Platform} from 'react-native';
import FavoritePage from '../screens/favoriteScreen';
import {COLORS} from '../constants/color';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const drawerIcon = ({focused, size, color}, name) => {
    return (
      <Icon
        name={name}
        size={size}
        color={focused ? Colors.active : Colors.inactive}
      />
    );
  };
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: Colors.transparent,
        drawerInactiveBackgroundColor: Colors.transparent,
        drawerActiveTintColor: Colors.active,
        drawerInactiveTintColor: COLORS.whitePure,
        drawerHideStatusBarOnOpen: Platform.OS === 'ios' ? true : false,
        overlayColor: Colors.transparent,
        drawerStyle: {
          backgroundColor: Colors.bg,
          width: '60%',
          paddingTop: 20,
        },
        sceneContainerStyle: {
          backgroundColor: COLORS.darkGray,
        },
      }}>
      <Drawer.Screen
        name="Kitsunee"
        component={HomePage}
        options={{
          drawerIcon: options => drawerIcon(options, 'home-outline'),
        }}
      />
      <Drawer.Screen
        name="Favorite"
        component={FavoritePage}
        options={{
          drawerIcon: options => drawerIcon(options, 'heart-outline'),
        }}
      />
      <Drawer.Screen
        name="Article"
        component={Article}
        options={{
          drawerIcon: options => drawerIcon(options, 'history'),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
