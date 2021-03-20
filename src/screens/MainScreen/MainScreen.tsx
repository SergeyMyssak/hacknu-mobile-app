import React, { FC, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Header } from '@components';
import { AppState } from '@modules/reducers';
import { NavigationInjectionDrawerProps } from '@types';
import { isVolunteer } from '@utils';

import UserMap from './UserMap';
import VolunteerMap from './VolunteerMap';

const MainScreen: FC<NavigationInjectionDrawerProps> = ({ navigation }): JSX.Element => {
  const { data } = useSelector(({ user }: AppState) => user);

  const openDrawer = useCallback((): void => {
    navigation.openDrawer();
  }, []);

  return (
    <>
      <Header mode='simple' title='Map of the needy' icon='menu' onPress={openDrawer} />
      {isVolunteer(data) ? <VolunteerMap /> : <UserMap />}
    </>
  );
};

export default memo(MainScreen);
