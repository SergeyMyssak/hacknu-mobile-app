import React, { FC, memo, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONTS } from '@constants';

import Watch from './Watch';

interface IProps {
  maxSeconds: number;
  leftText?: string;
  callback: () => void;
}

const { regular } = FONTS;

const Timer: FC<IProps> = ({ maxSeconds, leftText, callback }) => {
  const [seconds, handleSeconds] = useState(maxSeconds ?? 0);

  useEffect(() => {
    const secondsInterval = setInterval((): void => {
      if (seconds === 0) {
        callback();
        return;
      }

      handleSeconds(seconds - 1);
    }, 1000);

    return (): void => {
      clearInterval(secondsInterval);
    };
  }, [seconds]);

  return (
    <View style={styles.timer}>
      {leftText && <Text style={styles.leftTimerText}>{leftText}</Text>}
      <Watch seconds={seconds} />
    </View>
  );
};

const styles = StyleSheet.create({
  timer: {
    flexDirection: 'row',
  },
  leftTimerText: {
    fontFamily: regular,
    fontSize: 16,
    color: 'rgba(0,0,0,0.5)',
    marginRight: 2,
  },
});

export default memo(Timer);
