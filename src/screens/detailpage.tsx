/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SharedElement} from 'react-navigation-shared-element';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {
  kitsuneeFetchAnimeInfo,
  kitsuneeFetchRecentAnime,
} from '../api/api.helper';

import CustomText from '../@ui/text';
import CustomButton from '../@ui/button';

import Search from '../componets/search';
import {COLORS} from '../constants/color';
import ItemCards from '../componets/item-card';
import {IKitsuneeInfo} from '../constants/app.type';
import GradientBackground from '../componets/gradient-background';

import {
  bookMarkHelper,
  getBookmarkedAnimeIds,
} from '../helpers/bookmark-helper';
import {getFromStorage} from '../helpers/storagehelper';

type RootStackParamList = {
  DetailPage: {
    title?: string;
    image?: string;
    animeID?: string;
  };
};

interface IEpisodeInfo {
  id: string;
  url: string;
  number: number;
}

type DetailPageRouteProp = RouteProp<RootStackParamList, 'DetailPage'>;

const DetailPage = () => {
  const [expanded, setExpanded] = useState(false);
  const [recentAnime, setrecentAnime] = useState([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);
  const [animeDetail, setAnimeDetail] = useState<IKitsuneeInfo>();
  const [selectedEpisodeIds, setSelectedEpisodeIds] = useState<string[]>([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState<IEpisodeInfo[]>([]);

  const [bookmarked, setBookmarked] = useState(false);

  const route = useRoute<DetailPageRouteProp>();

  const image = route.params?.image;
  const title = route.params?.title;
  const animeID = route.params?.animeID;

  useEffect(() => {
    fetchRecentAnime();
    fetchAnimeDetail();
    checkBookmarkStatus();
  }, [animeID]);

  const checkBookmarkStatus = async () => {
    const bookmarkedAnimeIds = await getBookmarkedAnimeIds();
    setBookmarked(bookmarkedAnimeIds.includes(animeID));
  };

  useEffect(() => {
    const fetchSelectedEpisodeIds = async () => {
      const parsedIds = await getFromStorage('selectedEpisodeIds');
      setSelectedEpisodeIds(parsedIds || []);
    };

    fetchSelectedEpisodeIds();
  }, []);

  const fetchRecentAnime = async () => {
    const result = await kitsuneeFetchRecentAnime();
    setrecentAnime(result);
  };

  const Navigate = useNavigation();

  const fetchAnimeDetail = async () => {
    const results = await kitsuneeFetchAnimeInfo(animeID as string);
    setAnimeDetail(results);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const descriptionText = expanded
    ? animeDetail?.description
    : `${animeDetail?.description?.slice(0, 300)}${
        animeDetail?.description?.length > 300 ? '...' : ''
      }`;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (animeDetail?.episodes) {
      const filtered = animeDetail?.episodes.filter(episode =>
        episode?.id.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredEpisodes(filtered);
    }
  };

  const toggleShowAllEpisodes = () => {
    setShowAllEpisodes(!showAllEpisodes);
  };

  const getFirst14Episodes = () => {
    return animeDetail?.episodes.slice(0, 14);
  };

  const initialEpisodes = getFirst14Episodes();

  const handelNavigation = (episodeID: string) => {
    Navigate.navigate('Stream', {
      animeDetail: animeDetail,
      selectedEpisodeID: episodeID,
    });
  };

  const isEpisodeAlreadyWatched = (episodeId: string) =>
    selectedEpisodeIds.includes(episodeId);

  const animeDetailLength = animeDetail?.episodes?.length;

  const toggleBookmarkStatus = async () => {
    await bookMarkHelper(animeID as string);
    setBookmarked(!bookmarked);
  };

  return (
    <GradientBackground
      colors={[COLORS.lightBlue, COLORS.darkGray, COLORS.darkGray]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailWrapper}>
          <SharedElement id={`item.${animeID}.image`}>
            <Image
              style={styles.stretch}
              source={{
                uri: image,
              }}
            />
          </SharedElement>
          <View style={styles.imageOverlay} />
          <View style={styles.row}>
            <View style={styles.text}>
              <CustomText
                title={title as string}
                fontSize={19}
                fontType="bold"
              />
            </View>
            <CustomButton
              IconSize={24}
              hasIcon={true}
              IconName="heart"
              buttonColor={COLORS.black}
              IconColor={bookmarked ? COLORS.red : COLORS.white}
              onPress={() => toggleBookmarkStatus()}
            />
            <CustomButton
              title="play"
              IconSize={14}
              fontSize={16}
              hasIcon={true}
              IconName="caretright"
              IconColor={COLORS.black}
              buttonColor={COLORS.black}
              buttonStyle={styles.playButton}
              onPress={() =>
                handelNavigation(animeDetail?.episodes[0]?.id as string)
              }
            />
          </View>
          <View style={styles.contentRow}>
            {animeDetail ? (
              [
                animeDetail.status,
                animeDetail.genres.join(', '),
                animeDetail.releaseDate,
              ].map((text, index) => (
                <React.Fragment key={index}>
                  <CustomText title={text} />
                  {index < 2 && <Text style={styles.dot}>- </Text>}
                </React.Fragment>
              ))
            ) : (
              <SkeletonPlaceholder backgroundColor={COLORS.orange}>
                <View style={styles.skeletonContentRow}>
                  {[...Array(3)].map((_, index) => (
                    <React.Fragment key={index}>
                      <View style={styles.skeletonContentText} />
                      {index < 2 && <Text style={styles.dot}>-</Text>}
                    </React.Fragment>
                  ))}
                </View>
              </SkeletonPlaceholder>
            )}
          </View>
          <View style={styles.descriptionWrapper}>
            {animeDetail ? (
              <>
                <CustomText title="Description" fontSize={16} fontType="bold" />
                <TouchableOpacity onPress={toggleExpanded}>
                  <Text style={styles.description}>{descriptionText}</Text>
                </TouchableOpacity>
              </>
            ) : (
              <SkeletonPlaceholder backgroundColor={COLORS.orange}>
                <>
                  <View
                    style={{marginBottom: 10, borderRadius: 10, width: '30%'}}>
                    <View style={styles.description} />
                  </View>
                  <React.Fragment>
                    {[...Array(2)].map((_, index) => (
                      <View
                        style={{marginBottom: 10, borderRadius: 10}}
                        key={index}>
                        <View style={styles.description} />
                      </View>
                    ))}
                  </React.Fragment>
                </>
              </SkeletonPlaceholder>
            )}
          </View>
          <View style={styles.episodeWrapper}>
            <View style={styles.episodesBar}>
              <CustomText title="Episodes" fontSize={16} fontType="bold" />
              <Search
                onSearch={query => {
                  handleSearch(query);
                }}
                customStyles={styles.searchBar}
                placeholder="Search episodes.."
                backgroundColor={COLORS.midLightGray}
              />
            </View>

            <View style={styles.buttonWrapper}>
              {searchQuery !== '' &&
                filteredEpisodes?.map(episode => (
                  <CustomButton
                    key={episode.id}
                    onPress={() => {
                      handelNavigation(episode.id);
                    }}
                    title={episode.number}
                    buttonStyle={styles.buttonStyle(
                      isEpisodeAlreadyWatched(episode.id),
                    )}
                  />
                ))}
            </View>

            {animeDetail ? (
              <View style={styles.buttonWrapper}>
                {!showAllEpisodes &&
                  searchQuery === '' &&
                  initialEpisodes?.map(episode => (
                    <CustomButton
                      key={episode.id}
                      title={episode.number}
                      onPress={() => {
                        handelNavigation(episode.id);
                      }}
                      buttonStyle={styles.buttonStyle(
                        isEpisodeAlreadyWatched(episode.id),
                      )}
                    />
                  ))}
                {showAllEpisodes &&
                  searchQuery === '' &&
                  animeDetail?.episodes?.map(episode => (
                    <CustomButton
                      key={episode.id}
                      title={episode.number}
                      onPress={() => {
                        handelNavigation(episode.id);
                      }}
                      buttonStyle={styles.buttonStyle(
                        isEpisodeAlreadyWatched(episode.id),
                      )}
                    />
                  ))}
              </View>
            ) : (
              <SkeletonPlaceholder backgroundColor={COLORS.orange}>
                <React.Fragment>
                  <View style={{flexDirection: 'row'}}>
                    {[...Array(6)].map((_, index) => (
                      <View key={index} style={styles.buttonStyle} />
                    ))}
                  </View>
                </React.Fragment>
              </SkeletonPlaceholder>
            )}

            {searchQuery === '' && animeDetailLength > 14 && (
              <>
                {!showAllEpisodes ? (
                  <CustomButton
                    title="Show More"
                    onPress={toggleShowAllEpisodes}
                  />
                ) : (
                  <CustomButton
                    title="Show Less"
                    onPress={toggleShowAllEpisodes}
                  />
                )}
              </>
            )}
          </View>

          <View style={styles.line} />
          <ItemCards title="Recently Updated" anime={recentAnime} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default DetailPage;

const styles = StyleSheet.create<any>({
  detailWrapper: {
    flex: 1,
  },
  stretch: {
    height: 450,
    resizeMode: 'cover',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentRow: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  row: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playButton: {
    width: 120,
    height: 45,
    borderRadius: 20,
    backgroundColor: COLORS.orangePure,
  },
  text: {
    flex: 1,
  },
  dot: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    paddingTop: 10,
    paddingBottom: 10,
    color: COLORS.whitePure,
  },
  descriptionWrapper: {
    flexDirection: 'column',
    padding: 10,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  iconColumn: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  line: {
    margin: 10,
    width: '95%',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkBlue,
  },
  buttonWrapper: {
    marginTop: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  buttonStyle: (isWatched: boolean) => ({
    width: 50,
    height: 45,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: isWatched ? COLORS.gray : COLORS.orangePure,
  }),
  episodeWrapper: {
    marginLeft: 10,
    marginRight: 10,
  },
  episodesBar: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    marginLeft: 20,
  },
  skeletonContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 20,
  },
  skeletonContentText: {
    backgroundColor: '#ddd',
    width: 100,
    height: 20,
    marginRight: 5,
  },
});
