import {NativeModules, Platform} from 'react-native';

import type {
  AmazonModuleProps,
  AndroidModuleProps,
  IosModuleProps,
} from './types/global';

const {IapIos, IapAndroid, IapAmazon} = NativeModules;

const LINKING_ERROR =
  `The package 'react-native-iap' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ios: "- You have run 'pod install'\n", default: ''}) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const linkingError = new Proxy(
  {},
  {
    get() {
      throw new Error(LINKING_ERROR);
    },
  },
);

export const IosModule = (IapIos ? IapIos : linkingError) as IosModuleProps;

export const AndroidModule = (
  IapAndroid ? IapAndroid : linkingError
) as AndroidModuleProps;

export const AmazonModule = (
  IapAmazon ? IapAmazon : linkingError
) as AmazonModuleProps;

export const NativeModule = IapAndroid ?? IapAmazon ?? IapIos ?? linkingError;
