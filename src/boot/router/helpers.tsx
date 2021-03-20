import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ICONS } from '@static';

export const getNavigationOptions = (title: string, image?: string): any => ({
  drawerIcon: image && <FastImage source={ICONS[image]} style={styles.image} />,
  drawerLabel: title,
});

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
  },
});
