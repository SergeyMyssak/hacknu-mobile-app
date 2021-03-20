import React, { FC, memo, useCallback } from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch } from 'react-redux';
import { signOutRequest } from '@modules/auth/actions';
import { ISettingListItem } from '@screens/SettingsScreen/SettingsScreenTypes';

import SettingsScreenView from './SettingsScreenView';

const SettingsScreenContainer: FC<NavigationInjectedProps> = ({ navigation }): JSX.Element => {
  const { goBack: goBackRN } = navigation;

  const dispatch = useDispatch();

  const onPressSignOut = useCallback(async (): Promise<void> => {
    dispatch(signOutRequest({ navigation }));
  }, [dispatch, navigation]);

  const data: ISettingListItem[] = [{ title: 'Logout', onPress: onPressSignOut }];

  const goBack = useCallback((): void => {
    goBackRN(null);
  }, []);

  return <SettingsScreenView data={data} goBack={goBack} />;
};

export default memo(SettingsScreenContainer);
