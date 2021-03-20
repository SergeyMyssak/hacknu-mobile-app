import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator } from '@components';

const ActivityIndicatorFull: FC = (): JSX.Element => (
  <ActivityIndicator size='large' style={styles.activityIndicator} />
);

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(ActivityIndicatorFull);
