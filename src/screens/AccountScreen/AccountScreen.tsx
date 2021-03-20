import React, { FC, memo, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationInjectedProps } from 'react-navigation';
import { useSelector } from 'react-redux';
import { Header } from '@components';
import { COLORS } from '@constants';
import { AppState } from '@modules/reducers';
import { isVolunteer } from '@utils';

import GoToScreenButton from './GoToScreenButton';

const { background } = COLORS;

const AccountScreen: FC<NavigationInjectedProps> = ({ navigation }): JSX.Element => {
  const { goBack: goBackRN, navigate } = navigation;

  const { data } = useSelector(({ user }: AppState) => user);

  const onNavigate = useCallback(
    (screenName: string): void => {
      navigate(screenName);
    },
    [navigate],
  );

  const goBack = useCallback((): void => {
    goBackRN(null);
  }, []);

  const renderVolunteerBtns = (): JSX.Element => (
    <>
      <GoToScreenButton title='Заявки в работе' name='VolunteerRequests' onPress={onNavigate} />
      <GoToScreenButton title='Выполненные заявки' name='CompletedRequests' onPress={onNavigate} />
    </>
  );

  return (
    <>
      <Header icon='back' title='Аккаунт' onPress={goBack} />
      <KeyboardAwareScrollView keyboardShouldPersistTaps='never' style={styles.container}>
        <GoToScreenButton title='Мои данные' name='MyData' onPress={onNavigate} />
        <GoToScreenButton title='Мои заявки' name='MyRequests' onPress={onNavigate} />
        {isVolunteer(data) && renderVolunteerBtns()}
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
  },
});

export default memo(AccountScreen);
