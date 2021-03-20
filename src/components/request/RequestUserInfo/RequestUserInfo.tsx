import React, { FC, memo } from 'react';
import { Linking } from 'react-native';
import { UserModuleTypes } from '@types';

import RequestInfoItem from '../RequestInfoItem';

interface IProps {
  data: UserModuleTypes.IUser;
}

const RequestUserInfo: FC<IProps> = ({ data }): JSX.Element => {
  const { name, phone } = data;

  const onPhoneNumberPress = (value: string) => {
    Linking.openURL(`tel:${value}`);
  };

  return (
    <>
      <RequestInfoItem label='Name:' value={name} />
      <RequestInfoItem
        label='Phone number:'
        value={phone}
        rel='button'
        onPress={onPhoneNumberPress}
      />
    </>
  );
};

export default memo(RequestUserInfo);
