import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

export default function Controls(props:any) {
  return (
    <View style={styles.playColumn}>
      <TouchableOpacity onPress={props.Prev}>
        <Image
          style={styles.buttons}
          source={require('../../../assets/img/backward.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons} onPress={props.onPlayPause}>
        {props.state === 3 ? (
          <Image
            style={styles.buttons}
            source={require('../../../assets/img/play.png')}
          />
        ) : (
          <Image
            style={styles.buttons}
            source={require('../../../assets/img/stop.png')}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons} onPress={props.Next}>
        <Image source={require('../../../assets/img/forward.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  playColumn: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopWidth: 1,
    marginHorizontal: 20,
    marginTop: 40,
    paddingTop: 20,
  },
  buttons: {
    width: 30,
    height: 30,
  },
});
