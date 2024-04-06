import {StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';
import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import NavBar from '../componets/navbar';
import BookMarkCard from '../componets/bookmark-card';
import GradientBackground from '../componets/gradient-background';
import DrawerSceneWrapper from '../componets/drawer-scene-wrapper';

import {COLORS} from '../constants/color';
import {IKitsuneeInfo} from '../constants/app.type';

import CustomText from '../@ui/text';
import {kitsuneeFetchAnimeInfo} from '../api/api.helper';
import {getBookmarkedAnimeIds} from '../helpers/bookmark-helper';

const FavoritePage = () => {
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [bookmarkedAnimeInfo, setBookmarkedAnimeInfo] = useState<
    IKitsuneeInfo[]
  >([]);

  const fetchBookmarkedIds = async () => {
    const idList = await getBookmarkedAnimeIds();
    setBookmarkedIds(idList || []);
  };

  const fetchBookmarkedAnimeInfo = async () => {
    const animeInfoPromises = bookmarkedIds.map(id =>
      kitsuneeFetchAnimeInfo(id),
    );
    Promise.all(animeInfoPromises)
      .then(results => {
        setBookmarkedAnimeInfo(results);
      })
      .catch(error => {
        console.error('Error fetching bookmarked anime info:', error);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBookmarkedIds();
    }, []),
  );

  useEffect(() => {
    if (bookmarkedIds.length > 0) {
      fetchBookmarkedAnimeInfo();
    }
  }, [bookmarkedIds]);

  return (
    <DrawerSceneWrapper>
      <GradientBackground
        colors={[COLORS.lightBlue, COLORS.darkGray, COLORS.darkGray]}>
        <NavBar />
        {bookmarkedIds.length > 0 ? (
          <BookMarkCard title="Your Bookmarks" anime={bookmarkedAnimeInfo} />
        ) : (
          <View style={styles.noBookmark}>
            <CustomText title="No bookmark added Yet" fontSize={18} />
          </View>
        )}
      </GradientBackground>
    </DrawerSceneWrapper>
  );
};

export default FavoritePage;

const styles = StyleSheet.create({
  noBookmark: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
