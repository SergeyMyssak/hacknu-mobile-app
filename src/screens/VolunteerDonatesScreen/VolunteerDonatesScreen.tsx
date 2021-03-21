import React, { FC, memo, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '@components';
import { COLORS } from '@constants';
import { AppState } from '@modules/reducers';
import { fetchVolunteerDonatesRequest } from '@modules/volunteerDonates/actions';
import { DonateModuleTypes } from '@types';

import DonateList from './DonateList';

const { background } = COLORS;

const VolunteerDonatesScreen: FC<NavigationInjectedProps> = ({ navigation }): JSX.Element => {
  const { goBack: goBackRN, navigate } = navigation;

  const dispatch = useDispatch();

  const { data, isLoading } = useSelector(({ volunteerDonates }: AppState) => volunteerDonates);

  const fetchDonates = useCallback(() => dispatch(fetchVolunteerDonatesRequest()), [dispatch]);

  useEffect(() => {
    fetchDonates();
  }, []);

  const onVolunteerDonate = useCallback((item: DonateModuleTypes.IDonate): void => {
    navigate('VolunteerDonate', { id: item.id });
  }, []);

  const goBack = useCallback((): void => {
    goBackRN(null);
  }, []);

  const renderContent = (): JSX.Element => (
    <DonateList
      data={data}
      onPress={onVolunteerDonate}
      isLoading={isLoading}
      fetchDonates={fetchDonates}
    />
  );

  return (
    <View style={styles.container}>
      <Header icon='back' title='Donates' onPress={goBack} />
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

export default memo(VolunteerDonatesScreen);
