import type Embedded from '@/core/app/embedded';
import type { EmbeddedConfiguration } from '@/core/app/embedded';
import embeddedFactory from '@/core/app/factory'
import {DisplayMode} from '@/configuration'
import {EventType,} from '@/core/app/messages/types'
import type {FlowParameters} from "@/core/app/types";
import {CHECKOUT_API_URI} from "@/constants";

export default class DisplayableFlow {
    private _embedded: Embedded

    constructor(display: DisplayMode, config: EmbeddedConfiguration) {
        this._embedded = embeddedFactory(display, config)
        this._embedded.initialize()
    }

    async start(parameters: FlowParameters): Promise<void> {
        this._embedded.open(undefined, {
            product_id: parameters.productId,
            user_wallet: parameters.user.walletAddress,
            user_email: parameters.user.email,
            checkout_api_url: CHECKOUT_API_URI
        })
    }

    close() {
        this._embedded.close()
    }

    async waitResult<T>(
        type: EventType,
        closeOnSuccess: boolean = true
    ): Promise<T> {
        try {
            const result = await this._embedded.waitMessage<T>(type)
            if (closeOnSuccess) {
                this.close()
            }
            return result
        } catch (e) {
            this.close()
            throw e
        }
    }
}
