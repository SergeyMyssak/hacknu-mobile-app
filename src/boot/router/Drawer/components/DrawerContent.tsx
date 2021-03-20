import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationRoute } from 'react-navigation';
import { DrawerContentComponentProps, DrawerItems } from 'react-navigation-drawer';
import { Divider } from '@components';
import _ from 'lodash';

interface IProps {
  data: DrawerContentComponentProps;
  items: (string | NavigationRoute)[];
}

const DrawerContent: FC<IProps> = ({ data, items }): JSX.Element => {
  const renderItem = (item, index): JSX.Element => {
    if (_.isString(item)) {
      return <Divider key={index} addStyles={styles.divider} />;
    }

    return <DrawerItems key={index} {...data} items={[item]} />;
  };

  return <View style={styles.container}>{items.map(renderItem)}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  divider: {
    marginVertical: 8,
  },
});

export default memo(DrawerContent);
