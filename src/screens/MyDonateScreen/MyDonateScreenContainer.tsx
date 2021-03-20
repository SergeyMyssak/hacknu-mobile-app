import React, { FC, memo, useCallback } from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { closeMyDonateRequest } from '@modules/myDonates';
import { AppState } from '@modules/reducers';

import MyDonateScreenView from './MyDonateScreenView';

const MyDonateScreenContainer: FC<NavigationInjectedProps> = ({ navigation }): JSX.Element => {
  const { goBack: goBackRN, navigate, getParam } = navigation;
  const id = getParam('id');

  const dispatch = useDispatch();

  const { data } = useSelector(({ myDonates }: AppState) => myDonates);
  const item = data?.find((req) => req.id === id);

  const onUpdateDonate = useCallback((): void => {
    navigate('UpdateDonate', { data: item });
  }, [item]);

  const onCloseDonatePress = useCallback(() => {
    dispatch(closeMyDonateRequest({ id: item?.id }));
  }, [dispatch, item?.id]);

  const goBack = useCallback((): void => {
    goBackRN();
  }, []);

  return (
    <MyDonateScreenView
      data={item}
      onUpdateDonate={onUpdateDonate}
      onCloseDonatePress={onCloseDonatePress}
      goBack={goBack}
    />
  );
};

export default memo(MyDonateScreenContainer);
