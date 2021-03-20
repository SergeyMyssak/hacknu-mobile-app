import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { NavigationDrawerProp } from 'react-navigation-drawer';

export interface NavigationInjectionDrawerProps<P = unknown> {
  navigation: NavigationDrawerProp<P> | any;
}

export interface Navigation<P = NavigationParams> {
  navigation: NavigationScreenProp<NavigationState, P>;
}
