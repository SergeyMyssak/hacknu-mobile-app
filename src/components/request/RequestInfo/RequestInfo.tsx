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
      <RequestInfoItem label='Категория:' value={category.name} />
      <RequestInfoItem label='Адрес:' value={address} />
      <RequestInfoItem label='Что нужно:' value={need} />
      <RequestInfoItem label='Описание проблемы:' value={problem} />
    </>
  );
};

export default memo(RequestInfo);
