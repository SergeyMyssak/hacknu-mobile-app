import { useCallback, useRef, useState } from 'react';
import { RequestModuleTypes } from '@types';
import BottomSheetBehavior from 'reanimated-bottom-sheet';

const usePlacemarkBottomSheet = (webref, isFullHeight?: boolean): any[] => {
  const bottomSheetRef = useRef<BottomSheetBehavior>();

  const [data, setData] = useState<RequestModuleTypes.IRequest>();

  const onModalOpen = useCallback((item: RequestModuleTypes.IRequest): void => {
    bottomSheetRef?.current?.snapTo(0);
    setData(item);
  }, []);

  const onModalClose = useCallback((): void => {
    bottomSheetRef?.current?.snapTo(isFullHeight ? 2 : 1);
  }, []);

  const onModalCloseEnd = useCallback((): void => {
    const run = 'setPlacemarkInitialLayout && setPlacemarkInitialLayout(); true;';
    // @ts-ignore
    webref.current.injectJavaScript(run);
    setData(undefined);
  }, []);

  return [bottomSheetRef, data, onModalOpen, onModalClose, onModalCloseEnd];
};

export default usePlacemarkBottomSheet;
