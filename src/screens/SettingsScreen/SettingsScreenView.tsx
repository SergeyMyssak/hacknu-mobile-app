import React, { FC, memo } from 'react';
import { Header } from '@components';
import { ISettingListItem } from '@screens/SettingsScreen/SettingsScreenTypes';

import { SettingList } from './components';

interface IProps {
  data: ISettingListItem[];
  goBack: () => void;
}

const SettingsScreenView: FC<IProps> = ({ data, goBack }): JSX.Element => (
  <>
    <Header icon='back' title='Settings' onPress={goBack} />
    <SettingList data={data} />
  </>
);

export default memo(SettingsScreenView);
