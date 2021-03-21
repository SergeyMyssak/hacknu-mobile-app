import React, { FC, memo } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { BigButton } from '@components';
import { DonateModuleTypes } from '@types';

interface IProps {
  data?: DonateModuleTypes.IDonate[];
  isLoading: boolean;
  onPress: (data: DonateModuleTypes.IDonate) => void;
  fetchMyDonates: () => void;
}

const MyDonateList: FC<IProps> = ({ data, isLoading, onPress, fetchMyDonates }): JSX.Element => {
  const renderDonate = ({
    item,
    index,
  }: {
    item: DonateModuleTypes.IDonate;
    index: number;
  }): JSX.Element => <BigButton data={item} mode='complex' isFirst={!index} onPress={onPress} />;

  const keyExtractor = (item: DonateModuleTypes.IDonate): string => item.id;

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderDonate}
      contentContainerStyle={styles.contentContainerStyle}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchMyDonates} />}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 16,
  },
});

export default memo(MyDonateList);
