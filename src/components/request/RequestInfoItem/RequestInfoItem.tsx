import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS } from '@constants';

interface IProps {
  label: string;
  value: string;
  rel?: 'button';
  onPress?: (value: string) => void;
}

const { text, primary } = COLORS;
const { regular, medium } = FONTS;

const RequestInfoItem: FC<IProps> = ({ label, value, rel, onPress }): JSX.Element => {
  const onBtnPress = () => onPress && onPress(value);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.label]}>{label}</Text>
      {rel === 'button' ? (
        <TouchableOpacity onPress={onBtnPress}>
          <Text style={[styles.text, styles.value, styles.btn]}>{value}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={[styles.text, styles.value]}>{value}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  text: {
    color: text,
    fontSize: 16,
  },
  label: {
    fontFamily: medium,
    marginBottom: 10,
  },
  value: {
    fontFamily: regular,
  },
  btn: {
    color: primary,
    fontFamily: medium,
  },
});

export default RequestInfoItem;
