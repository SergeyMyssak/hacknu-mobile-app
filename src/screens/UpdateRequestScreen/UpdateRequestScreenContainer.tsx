import React, { FC, memo, useCallback, useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { updateMyRequestRequest } from '@modules/myRequests';
import { AppState } from '@modules/reducers';
import { RequestModuleTypes } from '@types';

import UpdateRequestScreenView from './UpdateRequestScreenView';

const UpdateRequestScreenContainer: FC<NavigationInjectedProps> = ({ navigation }) => {
  const { goBack: goBackRN, getParam } = navigation;
  const data: RequestModuleTypes.IRequest = getParam('data');

  const dispatch = useDispatch();

  const { isUpdateMyRequestLoading } = useSelector(({ myRequests }: AppState) => myRequests);

  const clearForm = useRef(() => {});

  useEffect(() => {
    const onBackAction = (): boolean => {
      clearForm?.current();

      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackAction);

    return (): void => {
      backHandler.remove();
    };
  }, []);

  const onUpdateRequestPress = useCallback((newData): void => {
    dispatch(updateMyRequestRequest({ navigation, id: data.id, ...newData }));
  }, []);

  const goBack = useCallback((): void => {
    clearForm.current();
    goBackRN();
  }, []);

  return (
    <UpdateRequestScreenView
      clearForm={clearForm}
      data={data}
      isLoading={isUpdateMyRequestLoading}
      onUpdateRequestPress={onUpdateRequestPress}
      goBack={goBack}
    />
  );
};

export default memo(UpdateRequestScreenContainer);
