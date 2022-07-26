import {NativeModules, Platform} from 'react-native';
import {InstallSourceAndroid} from './types';

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

export const getInstallSourceAndroid = (): InstallSourceAndroid => {
  return IapAndroid
    ? InstallSourceAndroid.GOOGLE_PLAY
    : InstallSourceAndroid.AMAZON;
};

export const IosModule = IapIos ? IapIos : linkingError;

export const AndroidModule =
  !IapAndroid && !IapAmazon
    ? linkingError
    : IapAndroid
    ? IapAndroid
    : IapAmazon;

export const AmazonModule = IapAmazon ? IapAmazon : linkingError;

export const NativeModule = IapAndroid
  ? IapAndroid
  : IapAmazon
  ? IapAmazon
  : IapIos;
