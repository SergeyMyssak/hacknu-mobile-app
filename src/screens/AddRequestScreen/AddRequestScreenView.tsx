import React, { FC, memo } from 'react';
import { Header, RequestForm } from '@components';
import { IDispatchSendMyRequest } from '@modules/myRequest/types';

interface IProps {
  clearForm: any;
  isLoading: boolean;
  onSendRequestPress: (data: IDispatchSendMyRequest) => void;
  goBack: () => void;
}

const AddRequestScreenView: FC<IProps> = ({ clearForm, isLoading, onSendRequestPress, goBack }) => (
  <>
    <Header icon='back' title='Add request' onPress={goBack} />
    <RequestForm clearForm={clearForm} isLoading={isLoading} onSubmit={onSendRequestPress} />
  </>
);

export default memo(AddRequestScreenView);
