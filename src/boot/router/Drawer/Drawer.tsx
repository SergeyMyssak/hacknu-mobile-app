import React, { FC, memo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DrawerContentComponentProps } from 'react-navigation-drawer';
import { useSelector } from 'react-redux';
import { Divider } from '@components';
import { AppState } from '@modules/reducers';
import { isUser, isVolunteer } from '@utils';

import { DrawerContent, DrawerHeader } from './components';

interface IProps {
  data: DrawerContentComponentProps;
}

const Drawer: FC<IProps> = ({ data }): JSX.Element => {
  const { items, navigation } = data;

  const userInfo = useSelector(({ user }: AppState) => user.data);

  const isLogged = useSelector(({ auth }: AppState) => auth.isLogged);

  const ITEMS = isVolunteer(userInfo)
    ? [items[0], items[3], items[4], '', items[7]]
    : isUser(userInfo)
    ? [items[0], items[1], items[2], '', items[5], items[6], '', items[7]]
    : [items[8]];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <DrawerHeader user={userInfo} navigation={navigation} isLogged={isLogged} />
      <Divider />
      <DrawerContent data={data} items={ITEMS} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: 16,
  },
});

export default memo(Drawer);
