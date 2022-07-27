import type {IAPErrorCode} from './global';

export class PurchaseError extends Error {
  message: string;
  responseCode: number;
  debugMessage: string;
  code: IAPErrorCode;
  productId: string;

  constructor(
    message: string,
    responseCode: number,
    debugMessage: string,
    code: IAPErrorCode,
    productId: string,
  ) {
    super(message);
    this.message = message;
    this.responseCode = responseCode;
    this.debugMessage = debugMessage;
    this.code = code;
    this.productId = productId;
  }
}
