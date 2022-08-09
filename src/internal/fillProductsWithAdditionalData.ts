import {AmazonModule} from '../modules';
import type {ProductCommon} from '../types';

/**
 * Fill products with additional data
 */
export const fillProductsWithAdditionalData = async <T = ProductCommon>(
  items: T[],
) => {
  if (AmazonModule) {
    // On amazon we must get the user marketplace to detect the currency
    const user = await AmazonModule.getUser();

    const currencies = {
      CA: 'CAD',
      ES: 'EUR',
      AU: 'AUD',
      DE: 'EUR',
      IN: 'INR',
      US: 'USD',
      JP: 'JPY',
      GB: 'GBP',
      IT: 'EUR',
      BR: 'BRL',
      FR: 'EUR',
    };

    const currency =
      currencies[user.userMarketplaceAmazon as keyof typeof currencies];

    // Add currency to items
    items.forEach((item) => {
      if (currency) {
        (item as unknown as ProductCommon).currency = currency;
      }
    });
  }

  return items;
};