import React, { FC, memo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicatorFull, Map } from '@components';
import { usePlacemarkBottomSheet } from '@hooks';
import { AppState } from '@modules/reducers';
import { fetchVolunteerMapRequest } from '@modules/volunteerMap';

import PlacemarkBottomSheet from './PlacemarkBottomSheet';
import { generateMap } from './VolunteerMapData';

const VolunteerMap: FC = (): JSX.Element => {
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
    dispatch(fetchVolunteerMapRequest());
  }, []);

  if (!geojson || !data || isLoading) {
    return <ActivityIndicatorFull />;
  }

  const html = generateMap({ geojson, data });

  return (
    <>
      <Map webref={webref} html={html} onPress={onModalOpen} />
      <PlacemarkBottomSheet
        innerRef={bottomSheetRef}
        data={bottomSheetData}
        onClose={onModalClose}
        onCloseEnd={onModalCloseEnd}
      />
    </>
  );
};

export default memo(VolunteerMap);
