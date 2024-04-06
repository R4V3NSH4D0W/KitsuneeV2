import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Dimensions, ImageBackground, StyleSheet, View} from 'react-native';

import CustomText from '../@ui/text';
import CustomButton from '../@ui/button';

import {COLORS} from '../constants/color';

const {width, height} = Dimensions.get('window');

const GettingStarted = () => {
  const Navigation = useNavigation();

  const handelNavigation = () => {
    Navigation.navigate('Drawer');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/image.jpg')}
        resizeMode="stretch"
        style={styles.background}>
        <View style={styles.textContainer}>
          <CustomText title="Find your" fontSize={50} />
          <CustomText title="Favorite Anime" fontType="bold" fontSize={50} />
          <CustomText title="To Watch." fontType="bold" fontSize={50} />
        </View>
        <View style={styles.overlay}>
          <CustomButton
            onPress={() => handelNavigation()}
            fontSize={20}
            title="Get Started"
            buttonStyle={styles.button}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default GettingStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  overlay: {
    bottom: 0,
    width: '100%',
    paddingBottom: 30,
    position: 'absolute',
    alignItems: 'center',
  },
  textContainer: {
    margin: 20,
    position: 'absolute',
    marginTop: height / 2 + 60,
  },
  button: {
    height: 60,
    width: width * 0.8,
    backgroundColor: COLORS.red,
  },
});
