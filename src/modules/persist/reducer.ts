import { REHYDRATE } from 'redux-persist';

export interface IPresistState {
  isHydrated: boolean;
}

const initialState: IPresistState = {
  isHydrated: false,
};

export default (state = initialState, { type }): IPresistState => {
  switch (type) {
    case REHYDRATE:
      return { ...state, isHydrated: true };
    default:
      return state;
  }
};
