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

  const { data, requests, isLoading } = useSelector(({ volunteerMap }: AppState) => volunteerMap);

  useEffect(() => {
    dispatch(fetchVolunteerMapRequest());
  }, []);

  if (!data || !requests || isLoading) {
    return <ActivityIndicatorFull />;
  }

  const html = generateMap({ data, requests });

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