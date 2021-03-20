import React, { FC, memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { FONTS } from '@constants';
import { RequestModuleTypes } from '@types';

const { regular } = FONTS;

interface IProps {
  data: RequestModuleTypes.ICategory;
  selectedCategory?: RequestModuleTypes.ICategory;
  hideBottomSheet: () => void;
  onSelect: (title: 'category', data: RequestModuleTypes.ICategory) => void;
}

const Category: FC<IProps> = ({
  data,
  selectedCategory,
  hideBottomSheet,
  onSelect,
}): JSX.Element => {
  const { id, name } = data;

  const onPress = (): void => {
    onSelect('category', data);
    hideBottomSheet();
  };

  const isSelected = selectedCategory?.id === id;

  return (
    <Ripple style={[styles.btn, isSelected && styles.selectedBtn]} onPress={onPress}>
      <Text style={styles.btnText}>{name}</Text>
    </Ripple>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  btnText: {
    color: '#000',
    fontFamily: regular,
    fontSize: 16,
  },
  selectedBtn: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

export default memo(Category);
