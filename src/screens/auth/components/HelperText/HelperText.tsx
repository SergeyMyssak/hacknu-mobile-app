import React, { FunctionComponent, memo } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { THEME } from '@constants';

interface IProps {
  style?: TextStyle;
  children?: string | string[];
}

const { colors, fonts } = THEME;
const { text } = colors;
const { regular } = fonts;

const HelperText: FunctionComponent<IProps> = ({ style, children }): JSX.Element => (
  <Text style={[styles.helpText, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  helpText: {
    color: text,
    fontSize: 16,
    fontFamily: regular,
    textAlign: 'center',
  },
});

export default memo(HelperText);
