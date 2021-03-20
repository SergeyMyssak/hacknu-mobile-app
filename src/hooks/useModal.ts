import { useCallback, useState } from 'react';

const useModal = (): any[] => {
  const [isModalVisible, setModalVisibility] = useState(false);

  const handleModalOpen = useCallback(() => setModalVisibility(true), []);
  const handleModalClose = useCallback(() => setModalVisibility(false), []);

  return [isModalVisible, handleModalOpen, handleModalClose];
};

export default useModal;
