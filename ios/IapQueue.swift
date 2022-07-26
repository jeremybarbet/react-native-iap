import Foundation
import StoreKit

// Temporarily stores payment information since it is sent by the OS before RN instantiates the RNModule
@objc(IapQueue)
public class IapQueue: NSObject, SKPaymentTransactionObserver {
    public func paymentQueue(_ queue: SKPaymentQueue, updatedTransactions transactions: [SKPaymentTransaction]) {
        // No-op
    }

    @objc
    public static let shared = IapQueue()

    var queue: SKPaymentQueue?
    var payment: SKPayment?
    var product: SKProduct?

    private override init() {}

    // Sent when a user initiates an IAP buy from the App Store
    @available(iOS 11.0, *)
    func paymentQueue(_ queue: SKPaymentQueue, shouldAddStorePayment payment: SKPayment, for product: SKProduct) -> Bool {
        IapQueue.shared.queue = queue
        IapQueue.shared.payment = payment
        IapQueue.shared.product = product
        return false
    }
}
