import React, { FC, memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { FONTS } from '@constants';
import { ISettingListItem } from '@screens/SettingsScreen/SettingsScreenTypes';

const { regular } = FONTS;

interface IProps {
  data: ISettingListItem;
}

const SettingListItem: FC<IProps> = ({ data }): JSX.Element => {
  const { title, helperText, onPress } = data;

  return (
    <Ripple style={[styles.container, !helperText && styles.addPadding]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </Ripple>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  addPadding: {
    paddingVertical: 20,
  },
  title: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
    fontFamily: regular,
  },
  helperText: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 14,
    fontFamily: regular,
  },
});

export default memo(SettingListItem);
