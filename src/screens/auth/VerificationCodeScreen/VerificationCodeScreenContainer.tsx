import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { NavigationInjectedProps, StackActions } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { signInRequest } from '@modules/auth';
import { AppState } from '@modules/reducers';

import VerificationCodeScreenView from './VerificationCodeScreenView';

const VerificationCodeScreenContainer: FC<NavigationInjectedProps> = ({
  navigation,
}): JSX.Element => {
  const { goBack: goBackRN, getParam, navigate } = navigation;
  const phone = getParam('phone');

  const dispatch = useDispatch();

  const [smsCode, handleSmsCode] = useState('');
  const [isTimerDone, handleTimerDone] = useState(false);

  const { data } = useSelector(({ user }: AppState) => user);

  useEffect((): void => {
    if (data) {
      if (data?.name) {
        navigation.dispatch(StackActions.popToTop());
      } else {
        navigate('EnterName');
      }
    }
  }, [data]);

  const timerCallback = useCallback((): void => handleTimerDone(true), []);
  const resendSMS = useCallback((): void => handleTimerDone(false), []);

  const onPressContinue = useCallback((): void => {
    dispatch(signInRequest({ phone, hashString: smsCode, navigation }));
  }, [phone, smsCode]);

  const goBack = useCallback((): void => {
    goBackRN();
  }, []);

  return (
    <VerificationCodeScreenView
      smsCode={smsCode}
      phone={phone}
      isTimerDone={isTimerDone}
      handleSmsCode={handleSmsCode}
      timerCallback={timerCallback}
      resendSMS={resendSMS}
      onPressContinue={onPressContinue}
      goBack={goBack}
    />
  );
};

export default memo(VerificationCodeScreenContainer);
