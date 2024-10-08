import {EImageSize} from './TopAlbumsModel';

export interface IAlbumDetailsDto {
  album: {
    artist: string;
    mbid: string;
    tags: {
      tag: {
        url: string;
        name: string;
      }[];
    };
    name: string;
    image: {
      size: EImageSize;
      ['#text']: string;
    }[];
    tracks: {
      track: {
        streamable: {fulltrack: string; ['#text']: string};
        duration: number;
        url: string;
        name: string;
        artist: {
          url: string;
          name: string;
          mbid: string;
        };
      }[];
    };
    listeners: string;
    playcount: string;
    url: string;
  };
}

export interface IAlbumTrack {
  id: string;
  duration: number;
  url: string;
  name: string;
  artist: {
    url: string;
    name: string;
    mbid: string;
  };
}

export interface IAlbumDetails {
  artist: string;
  imageUrl: string;
  tags: string[];
  name: string;
  tracks: IAlbumTrack[];
}

export const mapAlbumDetails = (
  albumDetailsDto: IAlbumDetailsDto,
): IAlbumDetails => {
  return {
    artist: albumDetailsDto.album.artist,
    imageUrl:
      albumDetailsDto.album.image.find(
        item => item.size === EImageSize.LARGE,
      )?.['#text'] ?? '',
    tags: albumDetailsDto.album.tags.tag.map(tag => tag.name),
    name: albumDetailsDto.album.name,
    tracks: albumDetailsDto.album.tracks.track.map((track, index) => ({
      id: `${track.artist.mbid}-${index}`,
      duration: track.duration,
      url: track.streamable.fulltrack,
      name: track.name,
      artist: {
        url: track.artist.url,
        name: track.artist.name,
        mbid: track.artist.mbid,
      },
    })),
  };
};
