import {
  StyleSheet,
  Image,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {APIKEY} from './Config';

interface Props {
  navigation: any;
  route: any;
}

export default function Album(props: Props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(20);

  useEffect(() => {
    asyncPostCall();
  }, []);

  // Fetch Albums
  const asyncPostCall = async () => {
    setLoading(true);
    console.log('FETCHING');
    try {
      const response = await fetch(
        `http://api.napster.com/v2.2/albums/top?apikey=${APIKEY}&limit=${count}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setData(data.albums);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Flatlist render component
  const renderAlbum = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.album}
        onPress={() => {
          props.navigation.navigate('Tracks', {
            tracks: item?.links?.tracks?.href,
            albumCover: item?.links?.images?.href,
          });
        }}>
        <Text style={styles.name}>{item?.name}</Text>
        <Text style={styles.artist}>{item?.artistName}</Text>
        <Text style={styles.date}>
          {moment(item?.released).format('MMMM')}{' '}
          {moment(item?.released).format('YYYY')}
        </Text>

        <Text style={styles.trackCount}>{item?.trackCount}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} color="#fff" />
      ) : (
        <>
          <Text style={styles.header}> Top Albums</Text>
          <FlatList data={data} renderItem={renderAlbum} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#517396',
  },
  header: {
    alignSelf: 'center',
    fontSize: 35,
    fontWeight: '3700',
    paddingVertical: 20,
    color: '#000',
  },
  album: {
    marginHorizontal: 15,
    padding: 18,
    borderRadius: 7,
    marginBottom: 6,
    backgroundColor: '#223651',
    elevation: 8,
  },
  trackCount: {
    position: 'absolute',
    right: 20,
    top: 20,
    color: '#7ba7c2',
    fontWeight: '400',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  artist: {
    fontSize: 13,
    fontWeight: '400',
    color: 'grey',
  },
  date: {
    fontSize: 11,
    fontWeight: '300',
    color: '#7ba7c2',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
