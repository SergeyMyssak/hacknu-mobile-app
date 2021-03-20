import React, { FC, memo, useEffect } from 'react';
import { BackHandler, StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { runTiming } from '@animations';
import { STATUS_BAR_SETTINGS_BEGIN, STATUS_BAR_SETTINGS_END } from '@constants';
import { setStatusBarAction } from '@modules/statusBar';

const { block, set, useCode, Clock, Value } = Animated;

interface IProps {
  children: JSX.Element;
  onHide?: () => void;
}

const opacity = new Value(0);
const clock = new Clock();

const Modal: FC<IProps> = ({ children, onHide }): JSX.Element => {
  const dispatch = useDispatch();

  useCode(() => block([set(opacity, runTiming(clock, opacity, 200, 1))]), [opacity, clock]);

  useEffect((): (() => void) => {
    const onHardwareBackPress = (): boolean => {
      if (!onHide) {
        return false;
      }

      onHide();
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onHardwareBackPress);

    return (): void => {
      BackHandler.removeEventListener('hardwareBackPress', onHardwareBackPress);
    };
  }, [onHide]);

  useEffect(() => (): void => opacity.setValue(0), []);

  useEffect((): (() => void) => {
    dispatch(setStatusBarAction(STATUS_BAR_SETTINGS_BEGIN));

    return (): void => {
      dispatch(setStatusBarAction(STATUS_BAR_SETTINGS_END));
    };
  }, [dispatch]);

  return (
    <Animated.View style={[styles.wrapper, { opacity }]}>
      <TouchableOpacity
        activeOpacity={1}
        disabled={!onHide}
        style={styles.container}
        onPress={onHide}
      >
        <TouchableOpacity style={styles.content} activeOpacity={1}>
          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    zIndex: 100,
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    margin: 16,
  },
});

export default memo(Modal);
