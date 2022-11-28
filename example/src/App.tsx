import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import * as YanggaAppAds from '../../src';

const SCREEN_WIDTH = Dimensions.get('screen').width;

export default function App() {
  return (
    <YanggaAppAds.Provider>
      <View style={styles.container}>
        <View style={styles.section}>
          <YanggaAppAds.Banner locale="ko" />
        </View>
        <View style={styles.section}>
          <View
            style={{
              width: SCREEN_WIDTH * 0.8,
            }}
          >
            <YanggaAppAds.Banner locale="en" />
          </View>
        </View>
        <View style={styles.section}>
          <View
            style={{
              width: SCREEN_WIDTH * 0.6,
            }}
          >
            <YanggaAppAds.Banner locale="it" />
          </View>
        </View>
        <View style={styles.section}>
          <View
            style={{
              width: SCREEN_WIDTH * 0.4,
            }}
          >
            <YanggaAppAds.Banner />
          </View>
        </View>
      </View>
    </YanggaAppAds.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderColor: '#222222',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
