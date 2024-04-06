/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomText from '../@ui/text';
import {COLORS} from '../constants/color';
import {IKitsuneePopular, IKitsuneeSearch} from '../constants/app.type';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import BookMarkLoader from '../loaders/bookmark-loader';

interface IProps {
  title?: string;
  anime?: IKitsuneePopular[] | IKitsuneeSearch[];
}

const BookMarkCard = ({title, anime}: IProps) => {
  const Navigation = useNavigation();

  const handleNavigation = (id: string, image: string, animeTitle: string) => {
    Navigation.navigate('Detail', {
      animeID: id,
      image: image,
      title: animeTitle,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.textWrapper}>
          <CustomText
            fontSize={16}
            fontType="bold"
            title={title as string}
            textColor={COLORS.whitePure}
          />
          <View style={styles.line} />
        </View>
        <View style={styles.detailWrapper}>
          {anime && anime.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={anime}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    handleNavigation(item.id, item.image, item.title)
                  }>
                  <View style={styles.imageContainer}>
                    <SharedElement id={`item.${item.id}.image`}>
                      <Image
                        style={styles.stretch}
                        source={{uri: item.image}}
                      />
                    </SharedElement>
                    <View style={styles.information}>
                      <CustomText title={item.title} />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <BookMarkLoader />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default BookMarkCard;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  stretch: {
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  line: {
    width: 30,
    marginVertical: 10,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.darkBlue,
  },
  textWrapper: {
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  detailWrapper: {
    marginTop: 10,
  },
  imageContainer: {
    width: 170,
    marginRight: 10,
    marginBottom: 20,
  },
  information: {
    padding: 10,
    height: 60,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  gap: {
    marginRight: 10,
  },
});
