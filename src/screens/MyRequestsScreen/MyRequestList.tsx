import React, { FC, memo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { BigButton } from '@components';
import { RequestModuleTypes } from '@types';

interface IProps {
  data?: RequestModuleTypes.IRequest[];
  onPress: (data: RequestModuleTypes.IRequest) => void;
}

const MyRequestList: FC<IProps> = ({ data, onPress }): JSX.Element => {
  const renderRequestListItem = ({
    item,
    index,
  }: {
    item: RequestModuleTypes.IRequest;
    index: number;
  }): JSX.Element => <BigButton data={item} mode='complex' isFirst={!index} onPress={onPress} />;

  const keyExtractor = (item: RequestModuleTypes.IRequest): string => item.id;

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

export default memo(MyRequestList);
