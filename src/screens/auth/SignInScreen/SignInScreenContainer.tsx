import React, { FC, memo, useCallback, useState } from 'react';
import { NavigationInjectedProps } from 'react-navigation';

import SignInScreenView from './SignInScreenView';

const SignInScreenContainer: FC<NavigationInjectedProps> = ({ navigation }): JSX.Element => {
  const { goBack: goBackRN, navigate } = navigation;

  const [phone, handlePhone] = useState('+7 (');

  const onChangePhone = useCallback((data: string): void => {
    if (data.length > 3) {
      handlePhone(data);
    }
  }, []);

  const onVerificationCodeScreen = useCallback((): void => {
    navigate('VerificationCode', { phone });
  }, [phone]);

  const goBack = useCallback((): void => {
    goBackRN(null);
  }, []);

  return (
    <SignInScreenView
      phone={phone}
      onChangePhone={onChangePhone}
      onVerificationCodeScreen={onVerificationCodeScreen}
      goBack={goBack}
    />
  );
};

export default memo(SignInScreenContainer);
