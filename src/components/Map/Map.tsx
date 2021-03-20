import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from '@components';
import { COLORS } from '@constants';

const { primary } = COLORS;

interface IProps {
  webref?: any;
  html: string;
  onPress?: (data: any) => void;
}

const Map: FC<IProps> = ({ webref, html, onPress }): JSX.Element => {
  const renderLoading = (): JSX.Element => (
    <ActivityIndicator size='large' color={primary} style={styles.activityIndicator} />
  );

  const onMessage = (event): void => {
    const { data } = event.nativeEvent;
    onPress && onPress(JSON.parse(data));
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webref}
        source={{ html }}
        style={styles.webView}
        onMessage={onMessage}
        renderLoading={renderLoading}
        javaScriptEnabled
        startInLoadingState
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  webView: {
    flex: 1,
  },
});

export default memo(Map);
