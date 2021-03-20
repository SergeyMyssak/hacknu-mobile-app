import React, { FC, memo, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '@components';
import { COLORS } from '@constants';
import { fetchMyDonatesRequest } from '@modules/myDonates';
import { AppState } from '@modules/reducers';
import { DonateModuleTypes } from '@types';

import MyDonateList from './MyDonateList';

const { background } = COLORS;

const MyDonatesScreen: FC<NavigationInjectedProps> = ({ navigation }): JSX.Element => {
  const { goBack: goBackRN, navigate } = navigation;

  const dispatch = useDispatch();

  const { data, isLoading } = useSelector(({ myDonates }: AppState) => myDonates);

  const fetchMyDonates = useCallback(() => dispatch(fetchMyDonatesRequest()), [dispatch]);

  useEffect(() => {
    dispatch(fetchMyDonates());
  }, []);

  const onMyDonate = useCallback((item: DonateModuleTypes.IDonate): void => {
    navigate('MyDonate', { id: item.id });
  }, []);

  const goBack = useCallback((): void => {
    goBackRN(null);
  }, []);

  const renderContent = (): JSX.Element => (
    <MyDonateList
      data={data}
      isLoading={isLoading}
      onPress={onMyDonate}
      fetchMyRequests={fetchMyDonates}
    />
  );

  return (
    <View style={styles.container}>
      <Header icon='back' title='My Donates' onPress={goBack} />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: background,
  },
});

export default memo(MyDonatesScreen);
