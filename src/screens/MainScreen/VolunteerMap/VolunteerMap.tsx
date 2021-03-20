import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicatorFull, Header, Map } from '@components';
import { VOLUNTEER_MAP_TYPES, VolunteerMapType } from '@constants';
import { usePlacemarkBottomSheet } from '@hooks';
import { AppState } from '@modules/reducers';
import { fetchVolunteerMapRequest } from '@modules/volunteerMap';
import { ICONS } from '@static';
import { isVolunteerMapApplications, isVolunteerMapDonations } from '@utils';

import PlacemarkBottomSheet from './PlacemarkBottomSheet';
import { generateMap } from './VolunteerMapData';

interface IProps {
  openDrawer: () => void;
}

const VolunteerMap: FC<IProps> = ({ openDrawer }): JSX.Element => {
  const [activeMode, setActiveMode] = useState<VolunteerMapType>(VOLUNTEER_MAP_TYPES.applications);

  const dispatch = useDispatch();

  const webref = useRef();

  const [
    bottomSheetRef,
    bottomSheetData,
    onModalOpen,
    onModalClose,
    onModalCloseEnd,
  ] = usePlacemarkBottomSheet(webref, true);

  const { geojson, data, isLoading } = useSelector(({ volunteerMap }: AppState) => volunteerMap);

  useEffect(() => {
    dispatch(fetchVolunteerMapRequest({ type: activeMode }));
  }, []);

  const renderHeader = () => {
    const renderRightButton = () => {
      const onPress = () => {
        dispatch(fetchVolunteerMapRequest({ type: activeMode }));
      };

      return (
        <Ripple onPress={onPress} rippleContainerBorderRadius={24} style={styles.refreshButton}>
          <FastImage source={ICONS.refresh} style={styles.icon} />
        </Ripple>
      );
    };

    return (
      <Header
        mode='simple'
        title={isVolunteerMapApplications(activeMode) ? 'Needs Map' : 'Map donations'}
        icon='menu'
        rightButton={renderRightButton()}
        onPress={openDrawer}
      />
    );
  };

  const renderButton = () => (
    <Ripple
      rippleColor='#FFF'
      rippleContainerBorderRadius={4}
      style={[
        styles.button,
        isVolunteerMapDonations(activeMode) && { backgroundColor: 'rgba(237, 67, 71, 0.8)' },
      ]}
      onPress={onPress}
    >
      <FastImage source={ICONS.swap} style={styles.icon} />
    </Ripple>
  );

  if (!geojson || !data || isLoading) {
    return (
      <>
        {renderHeader()}
        <ActivityIndicatorFull />
        {renderButton()}
      </>
    );
  }

  const html = generateMap({ geojson, data });

  const onPress = () => {
    if (isVolunteerMapApplications(activeMode)) {
      dispatch(fetchVolunteerMapRequest({ type: VOLUNTEER_MAP_TYPES.donations }));
      setActiveMode(VOLUNTEER_MAP_TYPES.donations);
    } else {
      dispatch(fetchVolunteerMapRequest({ type: VOLUNTEER_MAP_TYPES.applications }));
      setActiveMode(VOLUNTEER_MAP_TYPES.applications);
    }
  };

  return (
    <>
      {renderHeader()}
      <Map webref={webref} html={html} onPress={onModalOpen} />
      <PlacemarkBottomSheet
        innerRef={bottomSheetRef}
        data={bottomSheetData}
        onClose={onModalClose}
        onCloseEnd={onModalCloseEnd}
      />
      {renderButton()}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    bottom: 36,
    right: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(57,106, 212, 0.8)',
  },
  refreshButton: {
    padding: 8,
    marginRight: 4,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default memo(VolunteerMap);
