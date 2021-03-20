import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  addStyles?: any;
}

const Divider: FC<IProps> = ({ addStyles }): JSX.Element => (
  <View style={[styles.divider, addStyles]} />
);

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default memo(Divider);
