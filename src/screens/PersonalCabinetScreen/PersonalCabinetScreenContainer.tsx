import React, { FC, memo, useCallback } from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@modules/reducers';
import { updateUserInfoRequest } from '@modules/user';

import PersonalCabinetScreenView from './PersonalCabinetScreenView';

export interface IMyDataForm {
  name: string;
  phone: string;
}

const PersonalCabinetScreenContainer: FC<NavigationInjectedProps> = ({
  navigation,
}): JSX.Element => {
  const { goBack: goBackRN } = navigation;

  const dispatch = useDispatch();

  const { data, isUpdateUserInfoLoading } = useSelector(({ user }: AppState) => user);

  const onUpdateUserInfoPress = (item: IMyDataForm) => {
    dispatch(updateUserInfoRequest({ name: item.name }));
  };

  const goBack = useCallback((): void => {
    goBackRN(null);
  }, []);

  const initialValues: IMyDataForm = {
    name: data?.name || '',
    phone: data?.phone || '',
  };

  return (
    <PersonalCabinetScreenView
      initialValues={initialValues}
      isLoading={isUpdateUserInfoLoading}
      onUpdateUserInfoPress={onUpdateUserInfoPress}
      goBack={goBack}
    />
  );
};

export default memo(PersonalCabinetScreenContainer);
