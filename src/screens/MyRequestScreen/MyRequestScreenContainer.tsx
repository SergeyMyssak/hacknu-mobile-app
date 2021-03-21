import React, { FC, memo, useCallback } from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { closeMyRequestRequest } from '@modules/myRequests';
import { AppState } from '@modules/reducers';
import MyRequestScreenView from '@screens/MyRequestScreen/MyRequestScreenView';

const MyRequestScreenContainer: FC<NavigationInjectedProps> = ({ navigation }): JSX.Element => {
  const { goBack: goBackRN, navigate, getParam } = navigation;
  const id = getParam('id');

  const dispatch = useDispatch();

  const { data } = useSelector(({ myRequests }: AppState) => myRequests);
  const item = data?.find((req) => req.id === id);

  const onUpdateRequest = useCallback((): void => {
    navigate('UpdateRequest', { data: item });
  }, []);

  const onCloseRequestPress = useCallback(() => {
    dispatch(closeMyRequestRequest({ navigation, id: item?.id }));
  }, [dispatch]);

  const goBack = useCallback((): void => {
    goBackRN();
  }, []);

  return (
    <MyRequestScreenView
      data={item}
      onUpdateRequest={onUpdateRequest}
      onCloseRequestPress={onCloseRequestPress}
      goBack={goBack}
    />
  );
};

export default memo(MyRequestScreenContainer);
