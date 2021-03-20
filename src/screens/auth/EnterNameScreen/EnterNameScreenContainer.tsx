import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@modules/reducers';
import { updateUserInfoRequest } from '@modules/user';

import EnterNameScreenView from './EnterNameScreenView';

const EnterNameScreenContainer: FC<NavigationInjectedProps> = ({ navigation }): JSX.Element => {
  const { goBack: goBackRN } = navigation;

  const dispatch = useDispatch();

  const [name, handleName] = useState('');

  const { data, isUpdateUserInfoLoading } = useSelector(({ user }: AppState) => user);

  useEffect((): void => {
    if (data?.name) {
      goBackRN(null);
    }
  }, [data]);

  const onPressContinue = useCallback(() => {
    dispatch(updateUserInfoRequest({ name }));
  }, [name]);

  return (
    <EnterNameScreenView
      name={name}
      isLoading={isUpdateUserInfoLoading}
      onChangeName={handleName}
      onPressContinue={onPressContinue}
    />
  );
};

export default memo(EnterNameScreenContainer);
