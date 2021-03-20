import React, { FC, memo, useCallback } from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@modules/reducers';
import { rejectRequestRequest } from '@modules/volunteerRequests/actions';
import { RequestModuleTypes } from '@types';

import VolunteerRequestScreenView from './VolunteerRequestScreenView';

const VolunteerRequestScreenContainer: FC<NavigationInjectedProps> = ({
  navigation,
}): JSX.Element => {
  const { goBack: goBackRN, getParam } = navigation;
  const id = getParam('id');

  const dispatch = useDispatch();
  const { data, rejectLoading } = useSelector(
    ({ volunteerRequests }: AppState) => volunteerRequests,
  );

  const item: RequestModuleTypes.IRequest | undefined = data?.find((req) => req.id === id);
  const isLoading = rejectLoading.includes(id || '');

  const onPressRejectRequest = useCallback(() => {
    if (item?.id) {
      dispatch(rejectRequestRequest({ id: item.id, navigation }));
    }
  }, []);

  const goBack = useCallback((): void => {
    goBackRN();
  }, []);

  return (
    <VolunteerRequestScreenView
      data={item}
      isLoading={isLoading}
      onPressRejectRequest={onPressRejectRequest}
      goBack={goBack}
    />
  );
};

export default memo(VolunteerRequestScreenContainer);
