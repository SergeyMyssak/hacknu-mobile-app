import React, { FC, memo, useCallback } from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@modules/reducers';
import { rejectDonateRequest } from '@modules/volunteerDonates/actions';
import { DonateModuleTypes } from '@types';

import VolunteerDonateScreenView from './VolunteerDonateScreenView';

const VolunteerDonateScreenContainer: FC<NavigationInjectedProps> = ({
  navigation,
}): JSX.Element => {
  const { goBack: goBackRN, getParam } = navigation;
  const id = getParam('id');

  const dispatch = useDispatch();
  const { data, rejectLoading } = useSelector(({ volunteerDonates }: AppState) => volunteerDonates);

  const item: DonateModuleTypes.IDonate | undefined = data?.find((req) => req.id === id);
  const isLoading = rejectLoading.includes(id || '');

  const onPressRejectRequest = useCallback(() => {
    if (item?.id) {
      dispatch(rejectDonateRequest({ id: item.id, navigation }));
    }
  }, []);

  const goBack = useCallback((): void => {
    goBackRN();
  }, []);

  return (
    <VolunteerDonateScreenView
      data={item}
      isLoading={isLoading}
      onPressRejectRequest={onPressRejectRequest}
      goBack={goBack}
    />
  );
};

export default memo(VolunteerDonateScreenContainer);
