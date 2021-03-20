import React, { FC, memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import { COLORS, FONTS } from '@constants';
import { ICONS } from '@static';

interface IProps {
  title: string;
  name: string;
  onPress: (screenName: string) => void;
}
const { regular } = FONTS;
const { text } = COLORS;

const GoToScreenButton: FC<IProps> = ({ title, name, onPress }): JSX.Element => {
  const onBtnPress = () => onPress(name);

  return (
    <>
      <Ripple onPress={onBtnPress} style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <FastImage source={ICONS.chevronRight} style={styles.icon} />
      </Ripple>
      <View style={styles.divider} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 24,
    paddingVertical: 18,
    paddingRight: 12,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 16,
    fontFamily: regular,
    color: text,
  },
  icon: {
    height: 24,
    width: 24,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

export default memo(GoToScreenButton);
