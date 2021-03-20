import React, { FC, memo, useCallback } from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { sendMyRequestRequest } from '@modules/myRequest';
import { IDispatchSendMyRequest } from '@modules/myRequest/types';
import { AppState } from '@modules/reducers';

import AddRequestScreenView from './AddRequestScreenView';

const AddRequestScreenContainer: FC<NavigationInjectedProps> = ({ navigation }) => {
  const { goBack: goBackRN } = navigation;

  const dispatch = useDispatch();

  const { isLoading } = useSelector(({ myRequest }: AppState) => myRequest);

  const onSendRequestPress = useCallback(
    (data: IDispatchSendMyRequest): void => {
      dispatch(sendMyRequestRequest(data));
    },
    [dispatch],
  );

  const goBack = useCallback((): void => {
    goBackRN(null);
  }, []);

  return (
    <AddRequestScreenView
      isLoading={isLoading}
      onSendRequestPress={onSendRequestPress}
      goBack={goBack}
    />
  );
};

export default memo(AddRequestScreenContainer);
