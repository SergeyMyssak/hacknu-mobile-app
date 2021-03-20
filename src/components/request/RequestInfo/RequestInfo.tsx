import React, { FC, memo } from 'react';
import { RequestModuleTypes } from '@types';

import RequestInfoItem from '../RequestInfoItem';

interface IProps {
  data: RequestModuleTypes.IRequest;
}

const RequestInfo: FC<IProps> = ({ data }): JSX.Element => {
  const { category, address, need, problem } = data;

  return (
    <>
      <RequestInfoItem label='Category:' value={category?.name} />
      <RequestInfoItem label='Address:' value={address} />
      <RequestInfoItem label='What is your problem?:' value={need} />
      <RequestInfoItem label='Problem description:' value={problem} />
    </>
  );
};

export default memo(RequestInfo);
