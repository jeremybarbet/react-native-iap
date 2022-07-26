import {EmitterSubscription, NativeEventEmitter, Platform} from 'react-native';
import {AndroidModule, NativeModule} from './module';
import type {InAppPurchase, PurchaseError, SubscriptionPurchase} from './types';

/**
 * Add IAP purchase event
 */
export const purchaseUpdatedListener = (
  listener: (event: InAppPurchase | SubscriptionPurchase) => void,
): EmitterSubscription => {
  const myModuleEvt = new NativeEventEmitter(NativeModule);

  const emitterSubscription = myModuleEvt.addListener(
    'purchase-updated',
    listener,
  );

  if (Platform.OS === 'android') {
    AndroidModule().startListening();
  }

  return emitterSubscription;
};

/**
 * Add IAP purchase error event
 */
export const purchaseErrorListener = (
  listener: (errorEvent: PurchaseError) => void,
): EmitterSubscription =>
  new NativeEventEmitter(NativeModule).addListener('purchase-error', listener);
