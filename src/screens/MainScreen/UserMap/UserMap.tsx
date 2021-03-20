import React, { FC, memo, useCallback, useEffect } from 'react';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicatorFull, Map } from '@components';
import { AppState } from '@modules/reducers';
import { fetchUserMapRequest } from '@modules/userMap';
import { generateMap } from '@screens/MainScreen/UserMap/UserMapData';
import { RequestModuleTypes } from '@types';

const UserMap: FC<NavigationInjectedProps> = ({ navigation }): JSX.Element => {
  const { navigate } = navigation;

  const dispatch = useDispatch();

  const { data, isLoading } = useSelector(({ userMap }: AppState) => userMap);

  useEffect(() => {
    dispatch(fetchUserMapRequest());
  }, []);

  const onPressPlacemark = useCallback((item: RequestModuleTypes.IPublicRequest): void => {
    navigate('PublicRequests', { data: item });
  }, []);

  if (!data || isLoading) {
    return <ActivityIndicatorFull />;
  }

  const html = generateMap(data);

  return <Map html={html} onPress={onPressPlacemark} />;
};

export default memo(withNavigation(UserMap));
