import {useEffect, useState} from 'react'
import CheckoutSDK, {
    type CheckoutConfiguration,
    type CheckoutError,
    CheckoutEvents,
    type CheckoutSuccess
} from '@cometh/checkout-sdk'

export default function useCheckout(apiKey: string, configuration?: CheckoutConfiguration) {
    const [sdk, setSdk] = useState<CheckoutSDK>()
    const [success, setSuccess] = useState<CheckoutSuccess>()
    const [error, setError] = useState<CheckoutError>()

    useEffect(() => {
        const sdk = new CheckoutSDK(apiKey, configuration)
        sdk.on(CheckoutEvents.SUCCESS, (data: CheckoutSuccess) => {
            setSuccess(data)
            setError(undefined)
        })
        sdk.on(CheckoutEvents.FAILURE, (data: CheckoutError) => {
            setError(data)
            setSuccess(undefined)
        })
        setSdk(sdk)
    }, [apiKey])


    const startCheckout = async (productId: string, user: { walletAddress: string, email: string }) => {
        if (!sdk) return
        await sdk.checkout({
            productId,
            user
        })
    }

    return {
        startCheckout,
        success,
        error
    }
}