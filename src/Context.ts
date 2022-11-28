import React from 'react';
import type { IDatabase } from './types';

export interface IContextProp {
  isReady: boolean;
  database?: IDatabase;
}

const defaultContextProps: IContextProp = {
  isReady: false,
};

export const Context = React.createContext(defaultContextProps);

export function useYanggaAppAds() {
  return React.useContext(Context);
}
