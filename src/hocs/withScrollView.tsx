import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const withScrollView = (WrappedComponent: JSX.Element): JSX.Element => (
  <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
    {WrappedComponent}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default withScrollView;
