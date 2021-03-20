import React, { FC, memo, useCallback } from 'react';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useBottomSheet } from '@hooks';
import { IDispatchSendMyRequest } from '@modules/myRequest/types';
import { IDispatchUpdateMyRequest } from '@modules/myRequests/types';
import { RequestModuleTypes } from '@types';

import RequestFormView from './RequestFormView';

interface IProps extends NavigationInjectedProps {
  initialValues?: RequestModuleTypes.IRequestFormData;
  isLoading: boolean;
  onSubmit: (data: IDispatchSendMyRequest | IDispatchUpdateMyRequest | any) => void;
}

const RequestFormContainer: FC<IProps> = ({
  initialValues,
  isLoading,
  navigation,
  onSubmit,
}): JSX.Element => {
  const { navigate } = navigation;

  const [
    categoriesBottomSheetRef,
    isCategoriesBottomSheetVisible,
    handleCategoriesBottomSheetOpen,
    handleCategoriesBottomSheetClose,
    handleCategoriesBottomSheetCloseEnd,
  ] = useBottomSheet();

  const onPressSend = useCallback(
    (data: RequestModuleTypes.IRequestFormData, { resetForm }): void => {
      const { address, category, latitude, longitude, need, problem } = data;

      const formattedData = {
        navigation,
        resetForm,
        categoryId: category.id,
        address,
        need,
        problem,
        longitude,
        latitude,
      };

      onSubmit(formattedData);
    },
    [],
  );

  const onAddressMap = useCallback(
    (
      values: RequestModuleTypes.IRequestFormData,
      setFieldValue: (field: string, value: any) => void,
    ) => {
      const { latitude, longitude } = values;

      const onPressDone = ({ newAddress, newLatitude, newLongitude }): void => {
        setFieldValue('address', newAddress);
        setFieldValue('latitude', newLatitude);
        setFieldValue('longitude', newLongitude);
      };

      navigate('AddressMap', {
        latitude,
        longitude,
        onPressDone,
      });
    },
    [],
  );

  return (
    <RequestFormView
      initState={initialValues}
      categoriesBottomSheetRef={categoriesBottomSheetRef}
      isLoading={isLoading}
      isCategoriesBottomSheetVisible={isCategoriesBottomSheetVisible}
      handleCategoriesBottomSheetOpen={handleCategoriesBottomSheetOpen}
      handleCategoriesBottomSheetClose={handleCategoriesBottomSheetClose}
      handleCategoriesBottomSheetCloseEnd={handleCategoriesBottomSheetCloseEnd}
      onPressSend={onPressSend}
      onAddressMap={onAddressMap}
    />
  );
};

export default memo(withNavigation(RequestFormContainer));
