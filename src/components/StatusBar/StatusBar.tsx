import React, { FC, memo, useEffect } from 'react';
import { Platform, StatusBar as RNStatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { useSelector } from 'react-redux';
import { AppState } from '@modules/reducers';

interface IProps {
  children: JSX.Element;
}

const StatusBar: FC<IProps> = ({ children }): JSX.Element => {
  const statusBarSettings = useSelector(({ statusBar }: AppState) => statusBar);

  useEffect(() => {
    const { backgroundColor, barStyle, animated } = statusBarSettings;

    if (Platform.OS === 'android') {
      RNStatusBar.setBackgroundColor(backgroundColor, animated);
    }

    RNStatusBar.setBarStyle(barStyle, animated);
  }, [statusBarSettings]);

  return (
    <>
      <SafeAreaView
        style={[
          styles.container,
          Platform.OS === 'ios' && { backgroundColor: statusBarSettings.backgroundColor },
        ]}
        forceInset={{ top: 'always' }}
      >
        {children}
      </SafeAreaView>
      <SafeAreaView style={styles.bottomSafeAreaView} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSafeAreaView: {
    flex: 0,
    backgroundColor: '#FFF',
  },
});

export default memo(StatusBar);
