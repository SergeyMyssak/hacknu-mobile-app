import React, { FC, memo, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicatorFull, Header, Map } from '@components';
import { AppState } from '@modules/reducers';
import { fetchUserMapRequest } from '@modules/userMap';
import { generateMap } from '@screens/MainScreen/UserMap/UserMapData';
import { ICONS } from '@static';
import { RequestModuleTypes } from '@types';

interface IProps extends NavigationInjectedProps {
  openDrawer: () => void;
}

const UserMap: FC<IProps> = ({ navigation, openDrawer }): JSX.Element => {
  const { navigate } = navigation;

  const dispatch = useDispatch();

  const { data, isLoading } = useSelector(({ userMap }: AppState) => userMap);

  useEffect(() => {
    dispatch(fetchUserMapRequest());
  }, []);

  const onPressPlacemark = useCallback((item: RequestModuleTypes.IPublicRequest): void => {
    navigate('PublicRequests', { data: item });
  }, []);

  if (!data || isLoading) {
    return <ActivityIndicatorFull />;
  }

  const html = generateMap(data);

  const renderRightButton = () => {
    const onPress = () => {
      dispatch(fetchUserMapRequest());
    };

    return (
      <Ripple onPress={onPress} rippleContainerBorderRadius={24} style={styles.refreshButton}>
        <FastImage source={ICONS.refresh} style={styles.icon} />
      </Ripple>
    );
  };

  return (
    <>
      <Header
        mode='simple'
        title='Needs Map'
        icon='menu'
        onPress={openDrawer}
        rightButton={renderRightButton()}
      />
      <Map html={html} onPress={onPressPlacemark} />
    </>
  );
};

const styles = StyleSheet.create({
  refreshButton: {
    padding: 8,
    marginRight: 4,
  },
  icon: {
    padding: 8,
  },
});

export default memo(UserMap);
