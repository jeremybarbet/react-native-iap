import {useCallback} from 'react';

import {
  finishTransaction as iapFinishTransaction,
  getAvailablePurchases as iapGetAvailablePurchases,
  getProducts as iapGetProducts,
  getPurchaseHistory,
  getSubscriptions as iapGetSubscriptions,
  requestPurchase as iapRequestPurchase,
  requestSubscription as iapRequestSubscription,
} from '../index';
import type {Purchase, Sku} from '../types';

import {useIAPContext} from './withIAPContext';

export function useIAP() {
  const {
    connected,
    products,
    promotedProductsIOS,
    subscriptions,
    purchaseHistories,
    availablePurchases,
    currentPurchase,
    currentPurchaseError,
    setProducts,
    setSubscriptions,
    setAvailablePurchases,
    setPurchaseHistories,
    setCurrentPurchase,
    setCurrentPurchaseError,
  } = useIAPContext();

  const getProducts = useCallback(
    async (skus: Sku[]) => {
      setProducts(await iapGetProducts(skus));
    },
    [setProducts],
  );

  const getSubscriptions = useCallback(
    async (skus: Sku[]) => {
      setSubscriptions(await iapGetSubscriptions(skus));
    },
    [setSubscriptions],
  );

  const getAvailablePurchases = useCallback(async () => {
    setAvailablePurchases(await iapGetAvailablePurchases());
  }, [setAvailablePurchases]);

  const getPurchaseHistories = useCallback(async () => {
    setPurchaseHistories(await getPurchaseHistory());
  }, [setPurchaseHistories]);

  const finishTransaction = useCallback(
    async (
      purchase: Purchase,
      isConsumable?: boolean,
      developerPayloadAndroid?: string,
    ) => {
      try {
        return await iapFinishTransaction(
          purchase,
          isConsumable,
          developerPayloadAndroid,
        );
      } catch (error) {
        throw error;
      } finally {
        if (purchase.productId === currentPurchase?.productId) {
          setCurrentPurchase(undefined);
        }

        if (purchase.productId === currentPurchaseError?.productId) {
          setCurrentPurchaseError(undefined);
        }
      }
    },
    [
      currentPurchase?.productId,
      currentPurchaseError?.productId,
      setCurrentPurchase,
      setCurrentPurchaseError,
    ],
  );

  return {
    connected,
    products,
    promotedProductsIOS,
    subscriptions,
    purchaseHistories,
    availablePurchases,
    currentPurchase,
    currentPurchaseError,
    finishTransaction,
    getProducts,
    getSubscriptions,
    getAvailablePurchases,
    getPurchaseHistories,
    requestPurchase: iapRequestPurchase,
    requestSubscription: iapRequestSubscription,
  };
}
