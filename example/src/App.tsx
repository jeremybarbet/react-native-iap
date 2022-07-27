import React, {Component} from 'react';
import {
  Alert,
  Button as NativeButton,
  EmitterSubscription,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  clearTransactionIOS,
  endConnection,
  finishTransaction,
  flushFailedPurchasesCachedAsPendingAndroid,
  getAvailablePurchases,
  getProducts,
  getSubscriptions,
  InAppPurchase,
  initConnection,
  Product,
  PurchaseError,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase,
  requestSubscription,
  Sku,
  Subscription,
  SubscriptionPurchase,
} from 'react-native-iap';

// App Bundle > com.dooboolab.test

type Props = Record<string, never>;

interface State {
  productList: (Product | Subscription)[];
  receipt: string;
  availableItemsMessage: string;
}

const itemSkus = Platform.select({
  ios: [
    'com.cooni.point1000',
    'com.cooni.point5000', // dooboolab
  ],
  android: [
    'android.test.purchased',
    'android.test.canceled',
    'android.test.refunded',
    'android.test.item_unavailable',
    // 'point_1000', '5000_point', // dooboolab
  ],
  default: [],
}) as Sku[];

const itemSubs = Platform.select({
  ios: [
    'com.cooni.point1000',
    'com.cooni.point5000', // dooboolab
  ],
  android: [
    'test.sub1', // subscription
  ],
  default: [],
}) as Sku[];

let purchaseUpdateSubscription: EmitterSubscription;
let purchaseErrorSubscription: EmitterSubscription;

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      productList: [],
      receipt: '',
      availableItemsMessage: '',
    };
  }

  async componentDidMount() {
    try {
      await initConnection();

      if (Platform.OS === 'android') {
        await flushFailedPurchasesCachedAsPendingAndroid();
      } else {
        /**
         * WARNING This line should not be included in production code
         * This call will call finishTransaction in all pending purchases
         * on every launch, effectively consuming purchases that you might
         * not have verified the receipt or given the consumer their product
         *
         * TL;DR you will no longer receive any updates from Apple on
         * every launch for pending purchases
         */
        await clearTransactionIOS();
      }
    } catch (error) {
      if (error instanceof PurchaseError) {
        console.warn(error.code, error.message);
      }
    }

    purchaseUpdateSubscription = purchaseUpdatedListener(
      async (purchase: InAppPurchase | SubscriptionPurchase) => {
        console.info('purchase', purchase);

        const receipt = purchase.transactionReceipt
          ? purchase.transactionReceipt
          : purchase.originalJson;

        console.info(receipt);

        if (receipt) {
          try {
            const ackResult = await finishTransaction(purchase);
            console.info('ackResult', ackResult);
          } catch (error) {
            console.warn('error', error);
          }

          this.setState({receipt}, () => this.goNext());
        }
      },
    );

    purchaseErrorSubscription = purchaseErrorListener(
      (error: PurchaseError) => {
        console.log('purchaseErrorListener', error);
        Alert.alert('purchase error', JSON.stringify(error));
      },
    );
  }

  componentWillUnmount() {
    purchaseUpdateSubscription?.remove();
    purchaseErrorSubscription?.remove();
    endConnection();
  }

  goNext = () => {
    Alert.alert('Receipt', this.state.receipt);
  };

  getItems = async () => {
    try {
      const products = await getProducts(itemSkus);
      console.log('Products', products);

      this.setState({productList: products});
    } catch (error) {
      if (error instanceof PurchaseError) {
        console.warn(error.code, error.message);
      }
    }
  };

  getSubscriptions = async () => {
    try {
      const products = await getSubscriptions(itemSubs);
      console.log('Products', products);

      this.setState({productList: products});
    } catch (error) {
      if (error instanceof PurchaseError) {
        console.warn(error.code, error.message);
      }
    }
  };

  getAvailablePurchases = async () => {
    try {
      console.info(
        'Get available purchases (non-consumable or unconsumed consumable)',
      );

      const purchases = await getAvailablePurchases();
      console.info('Available purchases :: ', purchases);

      if (purchases?.length > 0) {
        this.setState({
          availableItemsMessage: `Got ${purchases.length} items.`,
          receipt: purchases[0]!.transactionReceipt,
        });
      }
    } catch (error) {
      if (error instanceof PurchaseError) {
        console.warn(error.code, error.message);
        Alert.alert(error.message);
      }
    }
  };

  // Version 3 apis
  requestPurchase = async (sku: Sku) => {
    try {
      requestPurchase(sku);
    } catch (error) {
      if (error instanceof PurchaseError) {
        console.warn(error.code, error.message);
      }
    }
  };

  requestSubscription = async (sku: Sku) => {
    try {
      requestSubscription(sku);
    } catch (error) {
      if (error instanceof PurchaseError) {
        Alert.alert(error.message);
      }
    }
  };

  render() {
    const {productList, receipt, availableItemsMessage} = this.state;
    const receipt100 = receipt.substring(0, 100);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>react-native-iap V3</Text>
        </View>
        <View style={styles.content}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.spacer} />

            <NativeButton
              title="Get available purchases"
              onPress={this.getAvailablePurchases}
            />

            <Text style={styles.messageTitle}>{availableItemsMessage}</Text>
            <Text style={styles.messageCopy}>{receipt100}</Text>

            <NativeButton
              title={`Get Products (${productList.length})`}
              onPress={() => this.getItems()}
            />

            {productList.map((product, i) => (
              <View key={i} style={styles.productRow}>
                <Text style={styles.productText}>
                  {JSON.stringify(product)}
                </Text>

                <NativeButton
                  title="Request purchase for above product"
                  onPress={() => this.requestSubscription(product.productId)}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.select({
      ios: 0,
      android: 24,
    }),
    paddingTop: Platform.select({
      ios: 0,
      android: 24,
    }),
    backgroundColor: 'white',
  },

  header: {
    flex: 20,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTxt: {
    fontSize: 26,
    color: 'green',
  },

  content: {
    flex: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  },

  scrollView: {
    alignSelf: 'stretch',
  },

  spacer: {
    height: 50,
  },

  messageTitle: {
    margin: 5,
    fontSize: 15,
    alignSelf: 'center',
  },

  messageCopy: {
    margin: 5,
    fontSize: 9,
    alignSelf: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  productRow: {
    flexDirection: 'column',
  },

  productText: {
    marginTop: 20,
    fontSize: 12,
    color: 'black',
    minHeight: 100,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
});

export default App;
