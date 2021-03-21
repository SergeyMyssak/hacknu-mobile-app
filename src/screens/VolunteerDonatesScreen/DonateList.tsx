import React, { FC, memo } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { VolunteerBigButton } from '@components';
import { DonateModuleTypes } from '@types';

interface IProps {
  data?: DonateModuleTypes.IDonate[];
  isLoading: boolean;
  onPress: (data: DonateModuleTypes.IDonate) => void;
  fetchDonates: () => void;
}

const DonateList: FC<IProps> = ({ data, isLoading, onPress, fetchDonates }): JSX.Element => {
  const renderRequestListItem = ({
    item,
    index,
  }: {
    item: DonateModuleTypes.IDonate;
    index: number;
  }): JSX.Element => <VolunteerBigButton data={item} isFirst={!index} onPress={onPress} />;

  const keyExtractor = (item: DonateModuleTypes.IDonate): string => item.id;

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderRequestListItem}
      contentContainerStyle={styles.contentContainerStyle}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchDonates} />}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 16,
  },
});

export default memo(DonateList);
