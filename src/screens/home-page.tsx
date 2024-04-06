import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, ScrollView, StyleSheet, View} from 'react-native';

import NavBar from '../componets/navbar';
import Search from '../componets/search';
import ItemCards from '../componets/item-card';
import GradientBackground from '../componets/gradient-background';
import DrawerSceneWrapper from '../componets/drawer-scene-wrapper';

import {
  KitsuneeSearch,
  kitsuneeFetchAnimeInfo,
  kitsuneeFetchRecentAnime,
  kitsuneeFetchPopularAnime,
} from '../api/api.helper';
import CustomButton from '../@ui/button';

import {COLORS} from '../constants/color';
import {IKitsuneePopular, IKitsuneeSearch} from '../constants/app.type';

const HomePage = () => {
  const Navigation = useNavigation();

  const [recentAnime, setRecentAnime] = useState([]);
  const [popularAnime, setPopularAnime] = useState<IKitsuneePopular[]>([]);
  const [searchResults, setSearchResults] = useState<IKitsuneeSearch[]>([]);

  const [randomAnimeDetail, setRandomAnimeDetail] = useState('');
  const [randomPopularAnimeImage, setRandomPopularAnimeImage] = useState('');

  useEffect(() => {
    fetchPopularAnime();
    fetchRecentAnime();
  }, []);

  useEffect(() => {
    getRandomPopularAnimeImage();
  }, [popularAnime]);

  const fetchPopularAnime = async () => {
    const result = await kitsuneeFetchPopularAnime();
    setPopularAnime(result);
  };

  const fetchRecentAnime = async () => {
    const result = await kitsuneeFetchRecentAnime();
    setRecentAnime(result);
  };

  const handleSearch = async (query: string) => {
    const results = await KitsuneeSearch(query);
    setSearchResults(results);
  };

  const getRandomPopularAnimeImage = () => {
    if (popularAnime.length > 0) {
      const randomIndex = Math.floor(Math.random() * popularAnime.length);
      const randomImage = popularAnime[randomIndex]?.image;
      const randomPopularAnimeID = popularAnime[randomIndex]?.id;
      setRandomPopularAnimeImage(randomImage);
      fetchRandomPopularAnimeDetail(randomPopularAnimeID);
    }
  };

  const fetchRandomPopularAnimeDetail = async (
    randomPopularAnimeID: string,
  ) => {
    const results = await kitsuneeFetchAnimeInfo(randomPopularAnimeID);
    setRandomAnimeDetail(results);
  };

  const handelNavigation = () => {
    if (randomAnimeDetail) {
      Navigation.navigate('Stream', {
        animeDetail: randomAnimeDetail,
        selectedEpisodeID: randomAnimeDetail.episodes[0]?.id,
      });
    }
  };

  return (
    <DrawerSceneWrapper>
      <GradientBackground
        colors={[COLORS.lightBlue, COLORS.darkGray, COLORS.darkGray]}>
        <SafeAreaView>
          <NavBar />

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.imageContainer}>
            <Image
              style={styles.stretch}
              source={{
                uri: randomPopularAnimeImage,
              }}
            />

            <View style={styles.imageOverlay} />

            <View style={styles.buttonLists}>
              <CustomButton
                title="play"
                IconSize={14}
                fontSize={16}
                hasIcon={true}
                IconName="caretright"
                IconColor={COLORS.black}
                buttonColor={COLORS.black}
                buttonStyle={styles.playButton}
                onPress={() => handelNavigation()}
              />
              <CustomButton
                title="list"
                fontSize={16}
                IconSize={14}
                hasIcon={true}
                IconName="pushpin"
                buttonStyle={styles.list}
              />
            </View>

            <View style={styles.cardInformation}>
              {searchResults.length > 0 && (
                <ItemCards title="Your Search Results" anime={searchResults} />
              )}
              <ItemCards title="Recently Updated" anime={recentAnime} />
              <ItemCards title="Top This Month" anime={popularAnime} />
            </View>
          </ScrollView>
          <View style={styles.search}>
            <Search
              onSearch={query => {
                handleSearch(query);
              }}
              elevationEnabled={false}
              customStyles={styles.search}
              backgroundColor="transparent"
            />
          </View>
        </SafeAreaView>
      </GradientBackground>
    </DrawerSceneWrapper>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stretch: {
    height: 400,
    resizeMode: 'cover',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonLists: {
    marginTop: -20,
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  list: {
    width: 160,
    height: 45,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  playButton: {
    width: 160,
    height: 45,
    borderRadius: 20,
    backgroundColor: COLORS.orangePure,
  },
  imageContainer: {
    width: '100%',
    marginTop: -60,
  },
  textWrapper: {
    marginLeft: 30,
  },
  search: {
    top: 20,
    width: '100%',
    position: 'absolute',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  detailWrapper: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  linearGradient: {
    flex: 1,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cardInformation: {
    paddingBottom: 60,
  },
});
