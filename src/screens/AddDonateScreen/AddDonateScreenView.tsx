import React, { FC, memo } from 'react';
import { DonateForm, Header } from '@components';
import { IDispatchSendMyDonate } from '@modules/myDonate/types';

interface IProps {
  clearForm: any;
  isLoading: boolean;
  onSendRequestPress: (data: IDispatchSendMyDonate) => void;
  goBack: () => void;
}

const AddDonateScreenView: FC<IProps> = ({ clearForm, isLoading, onSendRequestPress, goBack }) => (
  <>
    <Header icon='back' title='Add donate' onPress={goBack} />
    <DonateForm clearForm={clearForm} isLoading={isLoading} onSubmit={onSendRequestPress} />
  </>
);

export default memo(AddDonateScreenView);
