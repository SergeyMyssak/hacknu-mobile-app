import { useCallback, useRef } from 'react';
import BottomSheetBehavior from 'reanimated-bottom-sheet';

import useModal from './useModal';

const useBottomSheet = (isFullHeight?: boolean): any[] => {
  const bottomSheetRef = useRef<BottomSheetBehavior>();

  const [isModalVisible, handleModalOpen, handleModalClose] = useModal();

  const onModalOpen = useCallback((): void => {
    bottomSheetRef?.current?.snapTo(0);
    handleModalOpen();
  }, []);

  const onModalClose = useCallback((): void => {
    bottomSheetRef?.current?.snapTo(isFullHeight ? 2 : 1);
  }, []);

  const onModalCloseEnd = useCallback((): void => {
    handleModalClose();
  }, []);

  return [bottomSheetRef, isModalVisible, onModalOpen, onModalClose, onModalCloseEnd];
};

export default useBottomSheet;
