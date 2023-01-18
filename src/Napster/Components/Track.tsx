import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export default function Track(props:any) {
  return (
    <TouchableOpacity style={styles.track} onPress={props.navigate}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.art}>{props.artist}</Text>
      <Text style={styles.time}>{moment.utc(props.time*1000).format('mm:ss')}</Text>
      <View style={styles.preview}>
        <TouchableOpacity
       hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
        onPress={props.playCall}>
          {/* AsyncStorage.setItem('@Value', JSON.stringify(props.index)) */}
          {props.play ? (
            <Image
              style={styles.preButton}
              source={require('../../../assets/img/preplay.png')}
            />
          ) : (
            <Image
              style={styles.preButton}
              source={require('../../../assets/img/prepause.png')}
            />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffde9c',
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
    color: '#000',
  },
  preButton: {
    width: 35,
    height: 35,
  },
});
