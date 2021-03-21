import React, { FC, memo } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { VolunteerBigButton } from '@components';
import { RequestModuleTypes } from '@types';

interface IProps {
  data?: RequestModuleTypes.IRequest[];
  isLoading: boolean;
  onPress: (data: RequestModuleTypes.IRequest) => void;
  fetchRequests: () => void;
}

const RequestList: FC<IProps> = ({ data, isLoading, onPress, fetchRequests }): JSX.Element => {
  const renderRequestListItem = ({
    item,
    index,
  }: {
    item: RequestModuleTypes.IRequest;
    index: number;
  }): JSX.Element => <VolunteerBigButton data={item} isFirst={!index} onPress={onPress} />;

  const keyExtractor = (item: RequestModuleTypes.IRequest): string => item.id;

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderRequestListItem}
      contentContainerStyle={styles.contentContainerStyle}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchRequests} />}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 16,
  },
});

export default memo(RequestList);
