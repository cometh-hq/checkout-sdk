export interface CheckoutParameters {
    productId: string
    user: {
        walletAddress: string
        email: string
    }
}