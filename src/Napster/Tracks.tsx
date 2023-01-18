import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  BackHandler
} from 'react-native';
import React, {useState, useEffect} from 'react';
// import moment from 'moment-duration-format';
import moment from 'moment';

import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Track from '../Napster/Components/Track';
import {APIKEY} from './Config';

interface Props {
  navigation: any;
  route: any;
}

export default function Tracks(props: Props) {
  const [api, setApi] = useState(props.route.params.tracks);
  const [albumLink, setAlbumLink] = useState(props.route.params.albumCover);
  const [tracks, setTracks] = useState([]);
  const [albumCover, setAlbumCover] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    asyncPostCall();
    fetchAlbumCover();
    const willFocusSubscription = props.navigation.addListener('Focus', () => {
      asyncPostCall();
      fetchAlbumCover();
    });
    return willFocusSubscription;
   
  }, []);

  // get the tracks
  const asyncPostCall = async () => {
    console.log('FETCHING');
    setLoading(true);
    try {
      const response = await fetch(`${api}?apikey=${APIKEY}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      const tempArray = data.tracks;
      var newArray:any = [];
      tempArray.map((item:any, index:number) => {
        item['playing'] = false;
        newArray.push({
          id: index,
          url: item.previewURL,
          time: item.playbackSeconds,
          artist: item.artistName,
          title: item.name,
          play: item.playing,
        });
      });
      setTracks(newArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //   Get Album Cover
  const fetchAlbumCover = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${albumLink}?apikey=${APIKEY}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setAlbumCover(data.images[0]?.url);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //   PlayTrack
  const playSound = item => {
    console.log('the url is ' + item.url);
    if (item.url) {
      sound = new Sound(item.url, '', (error:any, _sound:any) => {
        if (error) {
          alert('error' + error.message);
          return;
        }
        sound.play(success => {
          if (success) {
            stopSound(item.url);
          }
        });
      });
    }
  };

  // stop Track
  const stopSound = i => {
    sound.stop(() => {
      console.log('Stop');
    });
  };

  //   Change Track
  const trackSong = () => {
    const jsonValue = AsyncStorage.getItem('@Value').then(r => {
      const v = JSON.parse(r);
      tracks.map((h:any)=> {
        if (h.id === tracks[v].id) {
          tracks[v].play = false;
          stopSound(i);
          setTracks([...tracks]);
        }
      });
    });
  };

  //   On&Off of preview Controller
  const call = (item: any) => {
    tracks.map((i: any, c: number) => {
      if (i.id == item.id) {
        if (i.play == false) {
          i.play = true;
          playSound(item);
        } else if (i.play == true) {
          i.play = false;
          stopSound(i);
        }
      }
    });
    setTracks([...tracks]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <>
          <Text style={styles.header}>Enjoy Latest {tracks.length} Tracks</Text>
          <Image style={styles.cover} source={{uri: albumCover}} />
          <FlatList
            data={tracks}
            renderItem={({item, index}: {item: any; index: any}) => {
              return (
                <Track
                  playCall={() => call(item)}
                  navigate={() =>
                    props.navigation.navigate('Song', {
                      tracks: item,
                      trackList: tracks,
                      cover: albumCover,
                    })
                  }
                  data={item}
                  index={index}
                  title={item?.title}
                  artist={item?.title}
                  play={item?.play}
                  album={albumCover}
                  tracks={tracks}
                  time={item?.time}
                />
              );
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffde9c',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '500',
    paddingVertical: 20,
    color: '#000',
  },
  cover: {
    alignSelf: 'center',
    height: 200,
    width: 200,
    marginBottom: 20,
  },
  track: {
    marginHorizontal: 15,
    padding: 18,
    borderRadius: 7,
    marginBottom: 6,
    backgroundColor: '#cb9904',
    elevation: 8,
  },
  preview: {
    position: 'absolute',
    right: 20,
    top: 20,
    color: '#fff',
    // fontWeight: '400',
  },
  title: {
    width: '90%',
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  art: {
    fontSize: 13,
    fontWeight: '400',
    color: '#fff',
  },
  time: {
    fontSize: 11,
    fontWeight: '300',
    color: '#7ba7c2',
  },
  preButton: {
    width: 35,
    height: 35,
  },
});
