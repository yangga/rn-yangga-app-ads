import type { ImageSourcePropType } from 'react-native';

export interface IApp {
  id: string;
  name: { [locale: string]: string };
  desc: { [locale: string]: string };
  store: {
    aos: string;
    ios: string;
  };
  icon: ImageSourcePropType;
}

export interface IDatabase {
  apps: IApp[];
}

export interface ISize {
  width: number;
  height: number;
}
