import React, { FC, memo, useCallback, useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { sendMyRequestRequest } from '@modules/myRequest';
import { AppState } from '@modules/reducers';

import AddRequestScreenView from './AddRequestScreenView';

const AddRequestScreenContainer: FC<NavigationInjectedProps> = ({ navigation }) => {
  const { goBack: goBackRN } = navigation;

  const clearForm = useRef(() => {});

  const dispatch = useDispatch();

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

  const { isLoading } = useSelector(({ myRequest }: AppState) => myRequest);

  const onSendRequestPress = useCallback(
    (data): void => {
      dispatch(sendMyRequestRequest(data));
    },
    [navigation, dispatch],
  );

  const goBack = useCallback((): void => {
    clearForm.current();
    goBackRN(null);
  }, []);

  return (
    <AddRequestScreenView
      clearForm={clearForm}
      isLoading={isLoading}
      onSendRequestPress={onSendRequestPress}
      goBack={goBack}
    />
  );
};

export default memo(AddRequestScreenContainer);
