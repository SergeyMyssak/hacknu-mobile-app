import React, { FunctionComponent, memo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FONTS } from '@constants';

interface IProps {
  onPress: () => void;
  children?: string;
}

const { regular } = FONTS;

const TextButton: FunctionComponent<IProps> = ({ onPress, children }): JSX.Element => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.textButton}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  textButton: {
    textDecorationLine: 'underline',
    fontFamily: regular,
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)',
  },
});

export default memo(TextButton);
