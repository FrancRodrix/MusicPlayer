import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  BackHandler,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import Controls from '../Napster/Components/Controls';

interface Props {
  navigation: any;
  route: any;
}

export default function Song(props: Props) {
  const playBackState = usePlaybackState();

  const [selectedTrack, setSelectedTrack] = useState(props.route.params.tracks);
  const [songs, setSong] = useState(props.route.params.trackList);
  const [cover, setCover] = useState(props.route.params.cover);
  const [songIndex, setSongIndex] = useState(selectedTrack.id);

  useEffect(() => {
    songs.splice(0, 1, selectedTrack);
    setSong([...songs]);
    listedMusic();
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [playBackState]);

  // Handle Back Button
  function handleBackButtonClick() {
    TrackPlayer.pause();
    ToastAndroid.showWithGravity(
      'Please Exit the App to Switch to New Album in order not run song in the Background',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );

    return true;
  }

  // Start playing current song
  const listedMusic = async () => {
    console.log('YYasf');
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(songs);
    await TrackPlayer.play();
  };

  // Play & Pause the song
  const onPlayPause = () => {
    console.log(playBackState, 'YY');
    if (playBackState === 'playing' || playBackState === 2) {
      TrackPlayer.pause();
    } else if (playBackState === 'paused' || playBackState === 3) {
      TrackPlayer.play();
    }
  };

  // Change Next Song
  const goNext = async () => {
    TrackPlayer.skipToNext(songs[songIndex + 1]);
    TrackPlayer.play();
  };

  //   Change Previous Song
  const goPrev = async () => {
    TrackPlayer.skipToPrevious(songs[songIndex - 1]);
    TrackPlayer.play();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={{uri: cover}} />
      <Controls
        Next={goNext}
        Prev={goPrev}
        onPlayPause={onPlayPause}
        state={playBackState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#55ffee',
  },
  image: {
    alignSelf: 'center',
    width: 300,
    height: 300,
    marginTop: 100,
    borderRadius: 10,
    borderBottomWidth: 1,
    elevation: 7,
  },
});
