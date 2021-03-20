import React, { FC, memo } from 'react';
import { DonateModuleTypes, RequestModuleTypes } from '@types';

import RequestInfoItem from '../RequestInfoItem';

interface IProps {
  data: RequestModuleTypes.IRequest | DonateModuleTypes.IDonate;
}

const RequestInfo: FC<IProps> = ({ data }): JSX.Element => {
  // @ts-ignore
  const { category, address, need, problem, text } = data;

  return (
    <>
      <RequestInfoItem label='Category:' value={category.name} />
      <RequestInfoItem label='Address:' value={address} />
      <RequestInfoItem label='Text:' value={text} />
      {need && <RequestInfoItem label='What is your problem?:' value={need} />}
      {problem && <RequestInfoItem label='Problem description:' value={problem} />}
    </>
  );
};

export default memo(RequestInfo);
