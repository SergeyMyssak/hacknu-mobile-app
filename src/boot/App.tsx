import React, { Component } from 'react';
import { LogBox, Platform, UIManager } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { API } from '@boot/http';
import { getSecureValue } from '@boot/keychain';
import AppContainer from '@boot/router';
import { ActivityIndicatorModal, StatusBar } from '@components';
import { ACCESS_TOKEN } from '@constants';
import store, { persistor } from '@modules/store';
import { Unsubscribe } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
  'Remote debugger is',
  'Required dispatch_sync to load constants',
  'RCTBridge required dispatch_sync ',
  '-[RCTRootView cancelTouches]',
]);

interface IState {
  isSignInLoading: boolean;
  isSignOutLoading: boolean;
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

class App extends Component<{}, IState> {
  private unsubscribeHydrated: Unsubscribe | undefined;
  private unsubscribeSignIn: Unsubscribe | undefined;
  private unsubscribeSignOut: Unsubscribe | undefined;

  constructor(props) {
    super(props);

    this.state = {
      isSignInLoading: false,
      isSignOutLoading: false,
    };
  }

  public async componentDidMount(): Promise<void> {
    const accessToken = await getSecureValue(ACCESS_TOKEN);
    if (accessToken) {
      API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }

    this.unsubscribeHydrated = store.subscribe(this.handleHydrated);
    this.unsubscribeSignIn = store.subscribe(this.handleSignIn);
    this.unsubscribeSignOut = store.subscribe(this.handleSignOut);
  }

  public componentWillUnmount(): void {
    this.unsubscribeSignOut && this.unsubscribeSignOut();
    this.unsubscribeSignIn && this.unsubscribeSignIn();
  }

  public render(): React.ReactNode {
    const { isSignInLoading, isSignOutLoading } = this.state;
    const text = isSignInLoading
      ? 'Authorization process'
      : isSignOutLoading
      ? 'Erase all your data from the phone'
      : '';

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar>
            <AppContainer />
          </StatusBar>
          {(isSignInLoading || isSignOutLoading) && <ActivityIndicatorModal text={text} />}
        </PersistGate>
      </Provider>
    );
  }

  private handleHydrated = (): void => {
    if (this.unsubscribeHydrated) {
      if (store.getState().persist.isHydrated) {
        this.unsubscribeHydrated();

        SplashScreen.hide();
      }
    }
  };

  private handleSignIn = (): void => {
    if (this.unsubscribeSignOut) {
      const { isSignInLoading: isSignInLoadingFromLocalState } = this.state;
      const { isSignInLoading } = store.getState().auth;

      if (isSignInLoadingFromLocalState !== isSignInLoading) {
        this.setState({ isSignInLoading });
      }
    }
  };

  private handleSignOut = (): void => {
    if (this.unsubscribeSignOut) {
      const { isSignOutLoading: isSignOutLoadingFromLocalState } = this.state;
      const { isSignOutLoading } = store.getState().auth;

      if (isSignOutLoadingFromLocalState !== isSignOutLoading) {
        this.setState({ isSignOutLoading });
      }
    }
  };
}

export default App;
