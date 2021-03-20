import React, { FC, memo, useCallback } from 'react';
import { FlatList } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { Header } from '@components';
import { RequestModuleTypes } from '@types';

import PublicRequest from './PublicRequest';

const PublicRequestsScreen: FC<NavigationInjectedProps> = ({ navigation }): JSX.Element => {
  const { goBack: goBackRN, getParam } = navigation;
  const { district, applications } = getParam('data');

  const goBack = useCallback((): void => {
    goBackRN();
  }, []);

  const renderPublicRequestListItem = ({
    item,
  }: {
    item: RequestModuleTypes.IPublicRequest;
  }): JSX.Element => <PublicRequest data={item} />;

  const keyExtractor = (item: RequestModuleTypes.IPublicRequest): string => item.id;

  return (
    <>
      <Header icon='back' title={district} onPress={goBack} />
      <FlatList
        data={applications}
        keyExtractor={keyExtractor}
        renderItem={renderPublicRequestListItem}
      />
    </>
  );
};

export default memo(PublicRequestsScreen);
