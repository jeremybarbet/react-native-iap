import React, {
  ComponentType,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';

import {getPromotedProductIOS, initConnection} from '../index';
import {
  purchaseErrorListener,
  purchaseUpdatedListener,
} from '../native-event-emitter';
import type {
  InAppPurchase,
  Product,
  Purchase,
  PurchaseError,
  Subscription,
  SubscriptionPurchase,
} from '../types';

interface IAPContext {
  connected: boolean;
  products: Product[];
  promotedProductsIOS: Product[];
  subscriptions: Subscription[];
  purchaseHistories: Purchase[];
  availablePurchases: Purchase[];
  currentPurchase?: Purchase;
  currentPurchaseError?: PurchaseError;
  initConnectionError?: Error;
  setProducts: (products: Product[]) => void;
  setSubscriptions: (subscriptions: Subscription[]) => void;
  setPurchaseHistories: (purchaseHistories: Purchase[]) => void;
  setAvailablePurchases: (availablePurchases: Purchase[]) => void;
  setCurrentPurchase: (currentPurchase: Purchase | undefined) => void;
  setCurrentPurchaseError: (
    currentPurchaseError: PurchaseError | undefined,
  ) => void;
}

const {RNIapIos} = NativeModules;
const IAPEmitter = new NativeEventEmitter(RNIapIos);
const IAPContext = createContext<IAPContext>({} as IAPContext);

export function withIAPContext<T>(Component: ComponentType<T>) {
  return function WrapperComponent(props: T) {
    const [connected, setConnected] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);

    const [promotedProductsIOS, setPromotedProductsIOS] = useState<Product[]>(
      [],
    );
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [purchaseHistories, setPurchaseHistories] = useState<Purchase[]>([]);

    const [availablePurchases, setAvailablePurchases] = useState<Purchase[]>(
      [],
    );
    const [currentPurchase, setCurrentPurchase] = useState<Purchase>();

    const [currentPurchaseError, setCurrentPurchaseError] =
      useState<PurchaseError>();

    const context = useMemo(
      () => ({
        connected,
        products,
        subscriptions,
        promotedProductsIOS,
        purchaseHistories,
        availablePurchases,
        currentPurchase,
        currentPurchaseError,
        setProducts,
        setSubscriptions,
        setPurchaseHistories,
        setAvailablePurchases,
        setCurrentPurchase,
        setCurrentPurchaseError,
      }),
      [
        connected,
        products,
        subscriptions,
        promotedProductsIOS,
        purchaseHistories,
        availablePurchases,
        currentPurchase,
        currentPurchaseError,
        setProducts,
        setSubscriptions,
        setPurchaseHistories,
        setAvailablePurchases,
        setCurrentPurchase,
        setCurrentPurchaseError,
      ],
    );

    useEffect(() => {
      initConnection().then(setConnected);
    }, []);

    useEffect(() => {
      if (!connected) {
        return;
      }

      const purchaseUpdateSubscription = purchaseUpdatedListener(
        async (purchase: InAppPurchase | SubscriptionPurchase) => {
          setCurrentPurchaseError(undefined);
          setCurrentPurchase(purchase);
        },
      );

      const purchaseErrorSubscription = purchaseErrorListener(
        (error: PurchaseError) => {
          setCurrentPurchase(undefined);
          setCurrentPurchaseError(error);
        },
      );

      const promotedProductsSubscription = IAPEmitter.addListener(
        'iap-promoted-product',
        async () => {
          const product = await getPromotedProductIOS();

          setPromotedProductsIOS((prevProducts) => [
            ...prevProducts,
            ...(product ? [product] : []),
          ]);
        },
      );

      return () => {
        purchaseUpdateSubscription.remove();
        purchaseErrorSubscription.remove();
        promotedProductsSubscription.remove();
      };
    }, [connected]);

    return (
      <IAPContext.Provider value={context}>
        <Component {...props} />
      </IAPContext.Provider>
    );
  };
}

export function useIAPContext() {
  const ctx = useContext<IAPContext>(IAPContext);

  if (!ctx) {
    throw new Error('You need wrap your app with withIAPContext HOC');
  }

  return ctx;
}
