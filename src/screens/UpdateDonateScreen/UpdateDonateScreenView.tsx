import React, { FC, memo } from 'react';
import { DonateForm, Header } from '@components';
import { IDispatchUpdateMyDonate } from '@modules/myDonates/types';
import { DonateModuleTypes } from '@types';

interface IProps {
  clearForm: any;
  data: DonateModuleTypes.IDonate;
  isLoading: boolean;
  onUpdateDonatePress: (data: IDispatchUpdateMyDonate) => void;
  goBack: () => void;
}

const UpdateDonateScreenView: FC<IProps> = ({
  clearForm,
  data,
  isLoading,
  onUpdateDonatePress,
  goBack,
}) => (
  <>
    <Header icon='back' title='Update donate' onPress={goBack} />
    <DonateForm
      clearForm={clearForm}
      isLoading={isLoading}
      initialValues={data}
      onSubmit={onUpdateDonatePress}
    />
  </>
);

export default memo(UpdateDonateScreenView);
