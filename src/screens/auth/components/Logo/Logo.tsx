import React, { FC, memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FONTS } from '@constants';
import { LOGO } from '@static';

const { light } = FONTS;

const Logo: FC = (): JSX.Element => (
  <View style={styles.container}>
    <FastImage source={LOGO['32']} style={styles.logo} />
    <Text style={styles.title}>Volunteer help</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  logo: {
    width: 141,
    height: 32,
  },
  title: {
    color: '#000',
    fontSize: 24,
    fontFamily: light,
    marginTop: 8,
  },
});

export default memo(Logo);
