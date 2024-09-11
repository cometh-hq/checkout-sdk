export interface FlowUser {
    walletAddress: string
    email: string
}

export interface FlowParameters {
    productId: string
    user: FlowUser
}