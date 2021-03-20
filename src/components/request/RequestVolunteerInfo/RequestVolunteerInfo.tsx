import React, { FC, memo } from 'react';
import { Linking } from 'react-native';
import { UserModuleTypes } from '@types';

import RequestInfoItem from '../RequestInfoItem';

interface IProps {
  data: UserModuleTypes.IVolunteer;
}

const RequestVolunteerInfo: FC<IProps> = ({ data }): JSX.Element => {
  const { organization, name, phone } = data;

  const onPhoneNumberPress = (value: string) => {
    Linking.openURL(`tel:${value}`);
  };

  return (
    <>
      <RequestInfoItem label={'Организация:'} value={organization.name} />
      <RequestInfoItem label={'Волонтер:'} value={name} />
      <RequestInfoItem
        label={'Номер телефона:'}
        value={phone}
        rel={'button'}
        onPress={onPhoneNumberPress}
      />
    </>
  );
};

export default memo(RequestVolunteerInfo);
