import React, { FC, memo, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '@components';
import { COLORS } from '@constants';
import { AppState } from '@modules/reducers';
import { fetchVolunteerRequestsRequest } from '@modules/volunteerRequests/actions';
import { RequestModuleTypes } from '@types';

import RequestList from './RequestList';

const { background } = COLORS;

const VolunteerRequestsScreen: FC<NavigationInjectedProps> = ({ navigation }): JSX.Element => {
  const { goBack: goBackRN, navigate } = navigation;

  const dispatch = useDispatch();

  const { data, isLoading } = useSelector(({ volunteerRequests }: AppState) => volunteerRequests);

  const fetchRequests = useCallback(() => dispatch(fetchVolunteerRequestsRequest()), [dispatch]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const onVolunteerRequest = useCallback((item: RequestModuleTypes.IRequest): void => {
    navigate('VolunteerRequest', { id: item.id });
  }, []);

  const goBack = useCallback((): void => {
    goBackRN(null);
  }, []);

  const renderContent = (): JSX.Element => (
    <RequestList
      data={data}
      isLoading={isLoading}
      onPress={onVolunteerRequest}
      fetchRequests={fetchRequests}
    />
  );

  return (
    <View style={styles.container}>
      <Header icon='back' title='Requests' onPress={goBack} />
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

export default memo(VolunteerRequestsScreen);
