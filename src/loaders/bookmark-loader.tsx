/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const BookMarkLoader = () => {
  return (
    <SkeletonPlaceholder highlightColor="#CCCCCC">
      <>
        <View style={[styles.rowContainer, {width: '100%', marginBottom: 10}]}>
          {[...Array(2)].map((_, index) => (
            <View
              key={index}
              style={[styles.imageContainer, index !== 4 && styles.gap]}>
              <SkeletonPlaceholder.Item
                width={170}
                height={200}
                borderRadius={10}
              />
            </View>
          ))}
        </View>
        <View style={[styles.rowContainer, {width: '100%'}]}>
          {[...Array(2)].map((_, index) => (
            <View
              key={index}
              style={[styles.imageContainer, index !== 4 && styles.gap]}>
              <SkeletonPlaceholder.Item
                width={170}
                height={200}
                borderRadius={10}
              />
            </View>
          ))}
        </View>
        <View style={[styles.rowContainer, {width: '100%'}]}>
          {[...Array(2)].map((_, index) => (
            <View
              key={index}
              style={[styles.imageContainer, index !== 4 && styles.gap]}>
              <SkeletonPlaceholder.Item
                width={170}
                height={200}
                borderRadius={10}
              />
            </View>
          ))}
        </View>
        <View style={[styles.rowContainer, {width: '100%'}]}>
          {[...Array(2)].map((_, index) => (
            <View
              key={index}
              style={[styles.imageContainer, index !== 4 && styles.gap]}>
              <SkeletonPlaceholder.Item
                width={170}
                height={200}
                borderRadius={10}
              />
            </View>
          ))}
        </View>
      </>
    </SkeletonPlaceholder>
  );
};

export default BookMarkLoader;

const styles = StyleSheet.create({
  rowContainer: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  gap: {
    marginRight: 10,
  },
  imageContainer: {
    width: 170,
    marginRight: 20,
    marginBottom: 20,
  },
});
