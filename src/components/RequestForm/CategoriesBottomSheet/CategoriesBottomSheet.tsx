import React, { FC, memo, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { BottomSheet } from '@components';
import { CATEGORIES } from '@constants';
import { RequestModuleTypes } from '@types';

import Category from './Category';

interface IProps {
  innerRef: any;
  selectedCategory: RequestModuleTypes.ICategory;
  isVisible: boolean;
  onSelect: (title: 'category', data: RequestModuleTypes.ICategory) => void;
  onClose: () => void;
  onCloseEnd: () => void;
}

const CategoriesBottomSheet: FC<IProps> = ({
  innerRef,
  selectedCategory,
  isVisible,
  onSelect,
  onClose,
  onCloseEnd,
}): JSX.Element | null => {
  const renderContent = useCallback((): JSX.Element => {
    const renderItem = ({ item }: { item: RequestModuleTypes.ICategory }): JSX.Element => (
      <Category
        data={item}
        selectedCategory={selectedCategory}
        hideBottomSheet={onClose}
        onSelect={onSelect}
      />
    );

    const keyExtractor = (item: RequestModuleTypes.ICategory): string => item.id.toString();

    return (
      <View style={styles.container}>
        <FlatList
          data={CATEGORIES}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      </View>
    );
  }, [onClose, onSelect, selectedCategory]);

  return (
    <BottomSheet
      innerRef={innerRef}
      title='Categories'
      isVisible={isVisible}
      renderContent={renderContent}
      enabledInnerScrolling={false}
      onClose={onClose}
      onCloseEnd={onCloseEnd}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 36,
    backgroundColor: '#FFF',
  },
  list: {
    paddingTop: 6,
    paddingBottom: 32,
  },
});

export default memo(CategoriesBottomSheet);
