import React, { FC, memo, useCallback } from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { Header } from '@components';
import AddressMap from '@screens/AddressMapScreen/AddressMap';

const AddressMapScreen: FC<NavigationInjectedProps> = ({ navigation }) => {
  const { goBack: goBackRN, getParam } = navigation;

  const longitude = getParam('longitude');
  const latitude = getParam('latitude');
  const onPressDone = getParam('onPressDone');

  const goBack = useCallback((): void => {
    goBackRN();
  }, []);

  return (
    <>
      <Header icon='back' title='Select address' onPress={goBack} />
      <AddressMap coords={{ longitude, latitude }} onPressDone={onPressDone} goBack={goBack} />
    </>
  );
};

export default memo(AddressMapScreen);
