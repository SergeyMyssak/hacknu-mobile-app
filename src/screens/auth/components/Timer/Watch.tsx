import React, { FC, memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { FONTS } from '@constants';

interface IProps {
  seconds: number;
}

const { regular } = FONTS;

const Watch: FC<IProps> = ({ seconds }): JSX.Element => {
  const pad = (num: number): string => ('0' + num).slice(-2);

  const formatSeconds = (): string => {
    const mod = seconds % 60;
    const minutes = (seconds - mod) / 60;

    return `${pad(minutes)}:${pad(mod)}`;
  };

  return <Text style={styles.time}>{formatSeconds()}</Text>;
};

const styles = StyleSheet.create({
  time: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
    fontFamily: regular,
  },
});

export default memo(Watch);
