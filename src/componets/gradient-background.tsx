import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';

const GradientBackground = ({children, colors}) => {
  return (
    <LinearGradient
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      colors={colors}
      style={styles.linearGradient}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});

export default GradientBackground;
