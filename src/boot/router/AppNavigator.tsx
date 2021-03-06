import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { getNavigationOptions } from '@boot/router/helpers';
import { FONTS } from '@constants';
import {
  AddDonateScreen,
  AddRequestScreen,
  AddressMapScreen,
  EnterNameScreen,
  MainScreen,
  MyDonateScreen,
  MyDonatesScreen,
  MyRequestScreen,
  MyRequestsScreen,
  PersonalCabinetScreen,
  PublicRequestsScreen,
  SettingsScreen,
  SignInScreen,
  UpdateDonateScreen,
  UpdateRequestScreen,
  VerificationCodeScreen,
  VolunteerDonateScreen,
  VolunteerDonatesScreen,
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
      navigationOptions: {
        cardStyle: {
          backgroundColor: '#FBFBFB',
        },
      },
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

const MyDonatesStack = createStackNavigator(
  {
    MyDonates: {
      screen: MyDonatesScreen,
    },
    MyDonate: {
      screen: MyDonateScreen,
    },
    UpdateDonate: {
      screen: UpdateDonateScreen,
    },
    AddressMap: {
      screen: AddressMapScreen,
    },
  },
  {
    initialRouteName: 'MyDonates',
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

const VolunteerDonatesStack = createStackNavigator(
  {
    VolunteerDonates: {
      screen: VolunteerDonatesScreen,
    },
    VolunteerDonate: {
      screen: VolunteerDonateScreen,
    },
  },
  {
    initialRouteName: 'VolunteerDonates',
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

const AddDonateStack = createStackNavigator(
  {
    AddDonate: {
      screen: AddDonateScreen,
    },
    AddressMap: {
      screen: AddressMapScreen,
    },
  },
  {
    initialRouteName: 'AddDonate',
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
      screen: MyDonatesStack,
      navigationOptions: getNavigationOptions('My donations', 'volunteer'),
    },
    VolunteerRequestsStack: {
      screen: VolunteerRequestsStack,
      navigationOptions: getNavigationOptions('Requests', 'products'),
    },
    VolunteerDonatesStack: {
      screen: VolunteerDonatesStack,
      navigationOptions: getNavigationOptions('Donates', 'products'),
    },
    AddRequestStack: {
      screen: AddRequestStack,
      navigationOptions: getNavigationOptions('Add request', 'add'),
    },
    AddDonateStack: {
      screen: AddDonateStack,
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
