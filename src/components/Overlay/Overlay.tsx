import React, { FC, memo, useEffect } from 'react';
import { BackHandler, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { runTiming } from '@animations';
import { setStatusBarAction } from '@modules/statusBar';

const { block, set, useCode, Clock, Value } = Animated;

interface IProps {
  hide: () => void;
}

let opacity = new Value(0);
const clock = new Clock();

const Overlay: FC<IProps> = ({ hide }): JSX.Element => {
  const dispatch = useDispatch();

  useCode(() => block([set(opacity, runTiming(clock, opacity, 200, 1))]), [opacity, clock]);

  useEffect((): (() => void) => {
    const onHardwareBackPress = (): boolean => {
      hide();
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onHardwareBackPress);

    return (): void => {
      BackHandler.removeEventListener('hardwareBackPress', onHardwareBackPress);
    };
  }, [hide]);

  useEffect((): (() => void) => {
    dispatch(
      setStatusBarAction({
        backgroundColor: 'rgba(0,0,0,0.5)',
        barStyle: 'dark-content',
        animated: true,
      }),
    );

    return (): void => {
      dispatch(
        setStatusBarAction({
          backgroundColor: '#FFF',
          barStyle: 'dark-content',
          animated: true,
        }),
      );
    };
  }, [dispatch]);

  useEffect(
    () => (): void => {
      opacity = new Value(0);
    },
    [],
  );

  return (
    <TouchableWithoutFeedback onPress={hide}>
      <Animated.View style={[styles.overlay, { opacity }]} />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
});

export default memo(Overlay);
