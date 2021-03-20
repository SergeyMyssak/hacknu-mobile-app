import React, { FC, memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { NavigationScreenProp } from 'react-navigation';
import { NavigationDrawerState } from 'react-navigation-drawer/src/types';
import { COLORS, FONTS } from '@constants';
import { LOGO } from '@static';
import { UserModuleTypes } from '@types';

const { primary_005 } = COLORS;
const { light } = FONTS;

interface IProps {
  user?: UserModuleTypes.IUser;
  navigation: NavigationScreenProp<NavigationDrawerState>;
  isLogged: boolean;
}

const DrawerHeader: FC<IProps> = (): JSX.Element => (
  <View style={styles.container}>
    <FastImage source={LOGO['32']} style={styles.logo} />
    <Text style={styles.title}>Volunteer help</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: primary_005,
  },

  logo: {
    width: 141,
    height: 32,
  },
  title: {
    color: '#000',
    fontSize: 16,
    fontFamily: light,
    marginTop: 8,
  },
});

export default memo(DrawerHeader);
