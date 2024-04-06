import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARK_KEY = 'bookmarkedAnimeIds';

export const bookMarkHelper = async (animeId: string) => {
  try {
    let bookmarkedAnimeIds = await getBookmarkedAnimeIds();
    if (bookmarkedAnimeIds.includes(animeId)) {
      bookmarkedAnimeIds = bookmarkedAnimeIds.filter(id => id !== animeId);
    } else {
      bookmarkedAnimeIds.push(animeId);
    }
    await AsyncStorage.setItem(
      BOOKMARK_KEY,
      JSON.stringify(bookmarkedAnimeIds),
    );
  } catch (error) {
    console.error('Error toggling bookmark:', error);
  }
};

export const getBookmarkedAnimeIds = async () => {
  try {
    const bookmarkedAnimeIds = await AsyncStorage.getItem(BOOKMARK_KEY);
    return bookmarkedAnimeIds ? JSON.parse(bookmarkedAnimeIds) : [];
  } catch (error) {
    console.error('Error fetching bookmarked anime IDs:', error);
    return [];
  }
};
