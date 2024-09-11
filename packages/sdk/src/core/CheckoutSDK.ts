import {type CheckoutConfiguration, DisplayMode} from '@/configuration'
import {buildURL} from '@/utils/safeURLBuilder'
import DisplayableFlow from "@/core/app/DisplayableFlow";
import {CHECKOUT_APP_URI} from "@/constants";
import type {CheckoutParameters} from "@/types";
import {EventType, type ResponseCheckoutTransactionDTO} from "@/core/app/messages/types";
import {CheckoutEventEmitter, CheckoutEvents} from "@/core/events/types";
import {TransactionStatus} from "@/core/transaction/types";

export default class CheckoutSDK extends CheckoutEventEmitter {
    private flow: DisplayableFlow

    constructor(apiKey: string, configuration?: CheckoutConfiguration) {
        super()
        const checkoutAppURI = configuration?.checkoutAppURI || CHECKOUT_APP_URI
        this.flow = new DisplayableFlow(configuration?.display || DisplayMode.IFRAME, {
            authorizedOrigin: checkoutAppURI,
            defaultURL: buildURL(
                checkoutAppURI,
                {checkout_api_key: encodeURIComponent(apiKey)}
            )
        })
    }

    async checkout(parameters: CheckoutParameters): Promise<void> {
        await this.flow.start(parameters)
        this.emit(CheckoutEvents.START)
        try {
            const response = await this.flow.waitResult<ResponseCheckoutTransactionDTO>(
                EventType.CHECKOUT_TRANSACTION
            )
            this.emit(CheckoutEvents.SUCCESS, {
                transactionId: response.transactionId,
                status: TransactionStatus.COMPLETED
            })
        } catch (e: any) {
            console.error(e)
            this.emit(CheckoutEvents.FAILURE, {
                message: e.message,
                status: e.status
            })
        }
    }
}
