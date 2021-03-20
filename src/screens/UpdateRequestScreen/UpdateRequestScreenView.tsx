import React, { FC, memo } from 'react';
import { Header, RequestForm } from '@components';
import { IDispatchUpdateMyRequest } from '@modules/myRequests/types';
import { RequestModuleTypes } from '@types';

interface IProps {
  clearForm: any;
  data: RequestModuleTypes.IRequest;
  isLoading: boolean;
  onUpdateRequestPress: (data: IDispatchUpdateMyRequest) => void;
  goBack: () => void;
}

const UpdateRequestScreenView: FC<IProps> = ({
  clearForm,
  data,
  isLoading,
  onUpdateRequestPress,
  goBack,
}) => (
  <>
    <Header icon='back' title='Update request' onPress={goBack} />
    <RequestForm
      clearForm={clearForm}
      isLoading={isLoading}
      initialValues={data}
      onSubmit={onUpdateRequestPress}
    />
  </>
);

export default memo(UpdateRequestScreenView);
