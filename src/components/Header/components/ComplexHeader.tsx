import React, { FC, memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FONTS } from '@constants';

const { regular } = FONTS;

interface IProps {
  title: string;
  avatar?: string;
  helperText: string;
  extraTitle?: JSX.Element;
  rightButton?: JSX.Element;
}

const ComplexHeader: FC<IProps> = ({
  title,
  avatar,
  extraTitle,
  helperText,
  rightButton,
}): JSX.Element => (
  <View style={styles.content}>
    {avatar ? (
      <FastImage source={{ uri: avatar }} style={styles.image} />
    ) : (
      <View style={[styles.image, styles.defaultLogo]} />
    )}
    <View style={styles.texts}>
      <View style={styles.titleContainer}>
        <View style={styles.titleWrapper}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>
        {!!extraTitle && extraTitle}
      </View>
      <Text numberOfLines={1} style={styles.helperText}>
        {helperText}
      </Text>
    </View>
    {!!rightButton && rightButton}
  </View>
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  image: {
    width: 40,
    height: 40,
    marginLeft: 8,
    marginRight: 16,
  },
  defaultLogo: {
    backgroundColor: 'rgba(44,164,133,0.51)',
  },
  texts: {
    flex: 1,
    marginTop: -2,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleWrapper: {
    flex: 1,
  },
  title: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
    fontFamily: regular,
  },
  helperText: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 12,
    fontFamily: regular,
  },
});

export default memo(ComplexHeader);
