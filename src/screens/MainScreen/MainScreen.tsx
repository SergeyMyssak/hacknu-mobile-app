import React, { FC, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
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

  if (isVolunteer(data)) {
    return <VolunteerMap openDrawer={openDrawer} />;
  }

  return <UserMap navigation={navigation} openDrawer={openDrawer} />;
};

export default memo(MainScreen);
