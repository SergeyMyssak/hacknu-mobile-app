import React, { FC, memo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ISettingListItem } from '@screens/SettingsScreen/SettingsScreenTypes';

import SettingListItem from './SettingListItem';

interface IProps {
  data: ISettingListItem[];
}

const SettingList: FC<IProps> = ({ data }): JSX.Element => {
  const keyExtractor = (_item, index): string => index.toString();

  const renderItem = ({ item }: { item: ISettingListItem }): JSX.Element => (
    <SettingListItem data={item} />
  );

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 10,
  },
});

export default memo(SettingList);
