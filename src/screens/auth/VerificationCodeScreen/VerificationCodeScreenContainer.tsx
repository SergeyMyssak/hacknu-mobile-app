import React, { FC, memo, useCallback, useState } from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch } from 'react-redux';
import { signInRequest } from '@modules/auth';

import VerificationCodeScreenView from './VerificationCodeScreenView';

const VerificationCodeScreenContainer: FC<NavigationInjectedProps> = ({
  navigation,
}): JSX.Element => {
  const { goBack: goBackRN, getParam } = navigation;
  const phone = getParam('phone');

  const dispatch = useDispatch();

  const [smsCode, handleSmsCode] = useState('');
  const [isTimerDone, handleTimerDone] = useState(false);

  const timerCallback = useCallback((): void => handleTimerDone(true), []);
  const resendSMS = useCallback((): void => handleTimerDone(false), []);

  const onPressContinue = useCallback((): void => {
    dispatch(signInRequest({ phone, hashString: smsCode, navigation }));
  }, [phone, smsCode, navigation]);

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
