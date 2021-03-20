import React, { FC, memo, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicatorFull, Header } from '@components';
import { COLORS } from '@constants';
import { fetchMyRequestsRequest } from '@modules/myRequests';
import { AppState } from '@modules/reducers';
import MyRequestList from '@screens/MyRequestsScreen/MyRequestList';
import { RequestModuleTypes } from '@types';

const { background } = COLORS;

const MyRequestsScreen: FC<NavigationInjectedProps> = ({ navigation }): JSX.Element => {
  const { goBack: goBackRN, navigate } = navigation;

  const dispatch = useDispatch();

  const { data, isLoading } = useSelector(({ myRequests }: AppState) => myRequests);

  useEffect(() => {
    dispatch(fetchMyRequestsRequest());
  }, []);

  const onMyRequestInfo = useCallback((item: RequestModuleTypes.IRequest): void => {
    navigate('MyRequestInfo', { id: item.id });
  }, []);

  const goBack = useCallback((): void => {
    goBackRN();
  }, []);

  const renderContent = (): JSX.Element => {
    if (!data || isLoading) {
      return <ActivityIndicatorFull />;
    }
    return <MyRequestList data={data} onPress={onMyRequestInfo} />;
  };

  return (
    <View style={styles.container}>
      <Header icon='back' title='My Requests' onPress={goBack} />
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

export default memo(MyRequestsScreen);
