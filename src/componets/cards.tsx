import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {COLORS} from '../constants/color';

interface CardsProps {
  title: string;
  image: string;
  genres: string[];
}

const Cards: React.FC<CardsProps> = ({title, image, genres}) => {
  return (
    <TouchableOpacity>
      <View style={styles.listingWrapper}>
        <Image
          style={styles.listImage}
          source={{
            uri: image,
          }}
        />
        <Text style={styles.listTitle}>{title}</Text>
        <Text style={styles.listDescription}>Genres: {genres.join(', ')}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Cards;

const styles = StyleSheet.create({
  listingWrapper: {
    backgroundColor: COLORS.whitePure,
    borderRadius: 12,
    marginVertical: 12,
    paddingBottom: 16,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  listTitle: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginHorizontal: 12,
  },
  listDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: '#666',
    marginHorizontal: 12,
  },
  listImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
  },
});
