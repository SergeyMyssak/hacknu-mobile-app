import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { getNavigationOptions } from '@boot/router/helpers';
import { FONTS } from '@constants';
import {
  AddRequestScreen,
  AddressMapScreen,
  EnterNameScreen,
  MainScreen,
  MyRequestScreen,
  MyRequestsScreen,
  PersonalCabinetScreen,
  PublicRequestsScreen,
  SettingsScreen,
  SignInScreen,
  UpdateRequestScreen,
  VerificationCodeScreen,
  VolunteerRequestScreen,
  VolunteerRequestsScreen,
} from '@screens';

import Drawer from './Drawer';

const { medium } = FONTS;

const MainStack = createStackNavigator(
  {
    Main: {
      screen: MainScreen,
    },
    PublicRequests: {
      screen: PublicRequestsScreen,
    },
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: '#FFF',
      },
      ...TransitionPresets.SlideFromRightIOS,
    },
    headerMode: 'none',
    mode: 'modal',
  },
);

const PersonalCabinetStack = createStackNavigator(
  {
    PersonalCabinet: {
      screen: PersonalCabinetScreen,
    },
  },
  {
    initialRouteName: 'PersonalCabinet',
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: '#FFF',
      },
      ...TransitionPresets.SlideFromRightIOS,
    },
    headerMode: 'none',
    mode: 'modal',
  },
);

const MyRequestsStack = createStackNavigator(
  {
    MyRequests: {
      screen: MyRequestsScreen,
    },
    MyRequest: {
      screen: MyRequestScreen,
    },
    UpdateRequest: {
      screen: UpdateRequestScreen,
    },
    AddressMap: {
      screen: AddressMapScreen,
    },
  },
  {
    initialRouteName: 'MyRequests',
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: '#FFF',
      },
      ...TransitionPresets.SlideFromRightIOS,
    },
    headerMode: 'none',
    mode: 'modal',
  },
);

const VolunteerRequestsStack = createStackNavigator(
  {
    VolunteerRequests: {
      screen: VolunteerRequestsScreen,
    },
    VolunteerRequest: {
      screen: VolunteerRequestScreen,
    },
  },
  {
    initialRouteName: 'VolunteerRequests',
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: '#FFF',
      },
      ...TransitionPresets.SlideFromRightIOS,
    },
    headerMode: 'none',
    mode: 'modal',
  },
);

const AddRequestStack = createStackNavigator(
  {
    AddRequest: {
      screen: AddRequestScreen,
    },
    AddressMap: {
      screen: AddressMapScreen,
    },
  },
  {
    initialRouteName: 'AddRequest',
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: '#FBFBFB',
      },
      ...TransitionPresets.SlideFromRightIOS,
    },
    headerMode: 'none',
    mode: 'modal',
  },
);

const AuthStack = createStackNavigator(
  {
    SignIn: {
      screen: SignInScreen,
    },
    VerificationCode: {
      screen: VerificationCodeScreen,
    },
    EnterName: {
      screen: EnterNameScreen,
    },
  },
  {
    initialRouteName: 'SignIn',
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: '#FFF',
      },
      ...TransitionPresets.SlideFromRightIOS,
    },
    headerMode: 'none',
    mode: 'modal',
  },
);

const AppNavigator = createDrawerNavigator(
  {
    PersonalCabinetStack: {
      screen: PersonalCabinetStack,
      navigationOptions: getNavigationOptions('Personal Cabinet', 'account'),
    },
    MyRequestsStack: {
      screen: MyRequestsStack,
      navigationOptions: getNavigationOptions('My requests', 'products'),
    },
    MyDonationsStack: {
      screen: MyRequestsStack,
      navigationOptions: getNavigationOptions('My donations', 'volunteer'),
    },
    VolunteerRequestsStack: {
      screen: VolunteerRequestsStack,
      navigationOptions: getNavigationOptions('Requests', 'products'),
    },
    AddRequestStack: {
      screen: AddRequestStack,
      navigationOptions: getNavigationOptions('Add request', 'add'),
    },
    DonateStack: {
      screen: AddRequestStack,
      navigationOptions: getNavigationOptions('Donate', 'add'),
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: getNavigationOptions('Settings', 'settings'),
    },
    SignIn: {
      screen: AuthStack,
      navigationOptions: getNavigationOptions('Sign in'),
    },
    MainStack: {
      screen: MainStack,
    },
  },
  {
    initialRouteName: 'MainStack',
    contentComponent: (data): JSX.Element => <Drawer data={data} />,
    contentOptions: {
      labelStyle: {
        color: 'rgba(0,0,0,0.6)',
        fontSize: 14,
        fontFamily: medium,
        fontWeight: 'normal',
        letterSpacing: 0.3,
      },
      itemsContainerStyle: {
        marginVertical: 0,
        paddingVertical: 0,
      },
    },
  },
);

const RootStack = createStackNavigator(
  {
    Root: {
      screen: AppNavigator,
    },
  },
  {
    initialRouteName: 'Root',
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: '#FFF',
      },
      ...TransitionPresets.SlideFromRightIOS,
    },
    headerMode: 'none',
    mode: 'modal',
  },
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
