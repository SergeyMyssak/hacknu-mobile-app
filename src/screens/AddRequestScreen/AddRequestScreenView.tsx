import React, { FC, memo } from 'react';
import { Header, RequestForm } from '@components';
import { IDispatchSendMyRequest } from '@modules/myRequest/types';

interface IProps {
  isLoading: boolean;
  onSendRequestPress: (data: IDispatchSendMyRequest) => void;
  goBack: () => void;
}

const AddRequestScreenView: FC<IProps> = ({ isLoading, onSendRequestPress, goBack }) => (
  <>
    <Header icon='back' title='Create request' onPress={goBack} />
    <RequestForm isLoading={isLoading} onSubmit={onSendRequestPress} />
  </>
);

export default memo(AddRequestScreenView);
