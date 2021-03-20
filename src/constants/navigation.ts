import { NavigationActions, StackActions } from 'react-navigation';

export const resetStackAction = StackActions.reset({
  index: 0,
  key: null,
  actions: [NavigationActions.navigate({ routeName: 'Root' })],
});
