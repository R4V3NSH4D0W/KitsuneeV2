export interface IKitsuneePopular {
  id: string;
  title: string;
  image: string;
  url: string;
  genres: string[];
}

export interface IKitsuneeInfo {
  id: string;
  title: string;
  url: string;
  genres: string[];
  episodeNumber: number;
  image: string;
  releaseDate: string;
  description: string;
  subOrDub: string;
  type: string;
  status: string;
  otherName: string;
  episodes: Episode[];
}

export interface Episode {
  id: string;
  number: number;
  url: string;
}

export interface IStyles {
  [key: string]: any;
}

export interface IKitsuneeSearch {
  id: string;
  title: string;
  url: string;
  image: string;
  releaseDate: string;
  subOrDub: 'sub' | 'dub';
}

export interface VideoData {
  headers: {
    Referer: string;
  };
  sources: {
    url: string;
    isM3U8: boolean;
    quality: string;
  }[];
  download: string;
}

export interface AnimeStreamNavigationParams {
  animeDetail: string;
  selectedEpisodeID: String;
}
