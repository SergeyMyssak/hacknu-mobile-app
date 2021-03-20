import React, { FC, memo, useCallback } from 'react';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useBottomSheet } from '@hooks';
import { IDispatchSendMyDonate } from '@modules/myDonate/types';
import { IDispatchUpdateMyDonate } from '@modules/myDonates/types';
import { DonateModuleTypes } from '@types';

import DonateFormView from './DonateFormView';

interface IProps extends NavigationInjectedProps {
  clearForm: any;
  initialValues?: DonateModuleTypes.IDonateFormData;
  isLoading: boolean;
  onSubmit: (data: IDispatchSendMyDonate | IDispatchUpdateMyDonate | any) => void;
}

const DonateFormContainer: FC<IProps> = ({
  clearForm,
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
    (data: DonateModuleTypes.IDonateFormData, { resetForm }): void => {
      const { address, category, latitude, longitude, text } = data;

      const formattedData = {
        navigation,
        resetForm,
        categoryId: category.id,
        address,
        text,
        longitude,
        latitude,
      };

      onSubmit(formattedData);
    },
    [],
  );

  const onAddressMap = useCallback(
    (
      values: DonateModuleTypes.IDonateFormData,
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
    <DonateFormView
      initState={initialValues}
      categoriesBottomSheetRef={categoriesBottomSheetRef}
      isLoading={isLoading}
      isCategoriesBottomSheetVisible={isCategoriesBottomSheetVisible}
      clearForm={clearForm}
      handleCategoriesBottomSheetOpen={handleCategoriesBottomSheetOpen}
      handleCategoriesBottomSheetClose={handleCategoriesBottomSheetClose}
      handleCategoriesBottomSheetCloseEnd={handleCategoriesBottomSheetCloseEnd}
      onPressSend={onPressSend}
      onAddressMap={onAddressMap}
    />
  );
};

export default memo(withNavigation(DonateFormContainer));
