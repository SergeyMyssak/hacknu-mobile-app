import React, { FC, memo, useCallback, useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { updateMyDonateRequest } from '@modules/myDonates';
import { AppState } from '@modules/reducers';
import { DonateModuleTypes } from '@types';

import UpdateDonateScreenView from './UpdateDonateScreenView';

const UpdateDonateScreenContainer: FC<NavigationInjectedProps> = ({ navigation }) => {
  const { goBack: goBackRN, getParam } = navigation;
  const data: DonateModuleTypes.IDonate = getParam('data');

  const dispatch = useDispatch();

  const { isUpdateMyDonateLoading } = useSelector(({ myDonates }: AppState) => myDonates);

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

  const onUpdateDonatePress = useCallback(
    (newData): void => {
      dispatch(updateMyDonateRequest({ navigation, id: data.id, ...newData }));
    },
    [data.id],
  );

  const goBack = useCallback((): void => {
    clearForm.current();
    goBackRN();
  }, []);

  return (
    <UpdateDonateScreenView
      clearForm={clearForm}
      data={data}
      isLoading={isUpdateMyDonateLoading}
      onUpdateDonatePress={onUpdateDonatePress}
      goBack={goBack}
    />
  );
};

export default memo(UpdateDonateScreenContainer);
