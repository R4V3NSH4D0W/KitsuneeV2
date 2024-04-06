import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import Orientation from 'react-native-orientation-locker';
import {useRoute, RouteProp} from '@react-navigation/native';
import GradientBackground from '../componets/gradient-background';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {COLORS} from '../constants/color';
import {IKitsuneeInfo, VideoData} from '../constants/app.type';
import CustomText from '../@ui/text';
import CustomButton from '../@ui/button';
import Search from '../componets/search';
import ItemCards from '../componets/item-card';
import {KitsuneeFetchVideo, kitsuneeFetchPopularAnime} from '../api/api.helper';
import {getFromStorage, saveToStorage} from '../helpers/storagehelper';

type RootStackParamList = {
  Stream: {animeDetail: IKitsuneeInfo; selectedEpisodeID: string};
};

const StreamVideo = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Stream'>>();
  const selectedEpisodeID = route.params?.selectedEpisodeID;
  const animeDetail = route.params?.animeDetail;

  const [episodeVideo, setEpisodeVideo] = useState<VideoData>({
    sources: [],
    download: '',
    headers: {Referer: ''},
  });

  const [popularAnime, setPopularAnime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedEpisodeId, setSelectedEpisodeId] =
    useState<string>(selectedEpisodeID);
  const [selectedEpisodeIds, setSelectedEpisodeIds] = useState<string[]>([]);
  const videoRef = useRef<Video>(null);

  const fetchPopularAnime = async () => {
    const result = await kitsuneeFetchPopularAnime();
    setPopularAnime(result);
  };

  useEffect(() => {
    fetchPopularAnime();
  }, []);

  useEffect(() => {
    if (selectedEpisodeId) {
      fetchVideo();
    }
  }, [selectedEpisodeId]);

  useEffect(() => {
    if (isFullScreen) {
      StatusBar.setHidden(true);
      Orientation.lockToLandscape();
    } else {
      StatusBar.setHidden(false);
      Orientation.lockToPortrait();
    }
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, [isFullScreen]);

  useEffect(() => {
    const fetchSelectedEpisodeIds = async () => {
      const parsedIds = await getFromStorage('selectedEpisodeIds');
      setSelectedEpisodeIds(parsedIds || []);
    };

    fetchSelectedEpisodeIds();
  }, []);

  const fetchVideo = async () => {
    setLoading(true);
    const result = await KitsuneeFetchVideo(selectedEpisodeId);
    setEpisodeVideo(result);
    setLoading(false);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleEpisodePress = (episodeId: string) => {
    setSelectedEpisodeId(episodeId);
    fetchVideo();
  };

  const saveEpisodeIdToStorage = async (id: string) => {
    await saveToStorage('selectedEpisodeIds', [...selectedEpisodeIds, id]);
    setSelectedEpisodeIds(prevIds => [...prevIds, id]);
  };

  const handleVideoLoad = () => {
    saveEpisodeIdToStorage(selectedEpisodeId);
  };

  const isEpisodeIdExists = (id: string) => selectedEpisodeIds.includes(id);

  return (
    <GradientBackground
      colors={[COLORS.lightBlue, COLORS.darkGray, COLORS.darkGray]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {episodeVideo?.sources &&
        episodeVideo?.sources.length > 0 &&
        !loading ? (
          <View style={styles.videoContainer}>
            <Video
              ref={videoRef}
              source={{uri: episodeVideo?.sources[2].url}}
              style={styles.videoPlayer}
              controls={true}
              resizeMode="contain"
              onLoad={handleVideoLoad}
            />
          </View>
        ) : (
          <SkeletonPlaceholder backgroundColor={COLORS.black}>
            <View style={styles.videoPlayer} />
          </SkeletonPlaceholder>
        )}
        {!isFullScreen && (
          <View style={styles.container}>
            <CustomText
              title={animeDetail?.title}
              fontType="bold"
              fontSize={18}
              textColor={COLORS.whitePure}
            />
            <View style={styles.episodesBar}>
              <CustomText title="Episodes" fontSize={16} fontType="bold" />
              <Search
                onSearch={query => {}}
                customStyles={styles.searchBar}
                placeholder="Search episodes.."
                backgroundColor={COLORS.midLightGray}
              />
            </View>
            <View style={styles.buttonWrapper}>
              {animeDetail?.episodes?.map(episode => (
                <CustomButton
                  key={episode.id}
                  onPress={() => {
                    handleEpisodePress(episode.id);
                  }}
                  title={episode.number}
                  buttonStyle={styles.buttonStyle(
                    isEpisodeIdExists(episode.id),
                    episode.id,
                    selectedEpisodeId,
                  )}
                />
              ))}
            </View>
          </View>
        )}
        {!loading && (
          <TouchableOpacity
            onPress={toggleFullScreen}
            style={styles.fullScreenIcon(isFullScreen)}>
            <Icon name="expand" size={16} color="#fff" />
          </TouchableOpacity>
        )}
        {!isFullScreen && (
          <ItemCards title="Popular Anime" anime={popularAnime} />
        )}
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create<any>({
  videoContainer: {
    backgroundColor: '#000',
  },
  videoPlayer: {
    width: '100%',
    height: 400,
  },
  fullScreenIcon: (isFullScreen: boolean) => ({
    right: 10,
    position: 'absolute',
    top: isFullScreen ? 10 : 30,
  }),
  container: {
    margin: 10,
  },
  buttonWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonStyle: (
    isAlreadySelected: boolean,
    episodeId: string,
    selectedEpisodeId: string,
  ) => ({
    width: 50,
    height: 45,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor:
      selectedEpisodeId === episodeId
        ? COLORS.red // Currently playing episode
        : isAlreadySelected
        ? COLORS.gray // Watched episode
        : COLORS.orangePure, // Unwatched episode
  }),
  episodesBar: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    marginLeft: 20,
  },
});

export default StreamVideo;
