import React, { FC, memo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { BigButton } from '@components';
import { DonateModuleTypes } from '@types';

interface IProps {
  data?: DonateModuleTypes.IDonate[];
  onPress: (data: DonateModuleTypes.IDonate) => void;
}

const DonateList: FC<IProps> = ({ data, onPress }): JSX.Element => {
  const renderRequestListItem = ({
    item,
    index,
  }: {
    item: DonateModuleTypes.IDonate;
    index: number;
  }): JSX.Element => <BigButton data={item} mode='simple' isFirst={!index} onPress={onPress} />;

  const keyExtractor = (item: DonateModuleTypes.IDonate): string => item.id;

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderRequestListItem}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 16,
  },
});

export default memo(DonateList);
