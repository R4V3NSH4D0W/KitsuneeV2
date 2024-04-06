import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import NavBar from '../componets/navbar';
import DrawerSceneWrapper from '../componets/drawer-scene-wrapper';
import {COLORS} from '../constants/color';

const Feed = () => {
  return (
    <DrawerSceneWrapper>
      <View style={styles.container}>
        <NavBar />
      </View>
    </DrawerSceneWrapper>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
