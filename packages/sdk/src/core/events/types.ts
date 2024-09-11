import { EventEmitter } from 'eventemitter3'
import type {TransactionStatus} from "@/core/transaction/types";

export enum CheckoutEvents {
    START = 'checkoutStart',
    SUCCESS = 'checkoutSuccess',
    FAILURE = 'checkoutFailure'
}

export interface CheckoutSuccess {
    transactionId: string
    txHash: string
    status: TransactionStatus
}

export interface CheckoutError {
    message: string
    transactionId?: string
    txHash?: string
    status: TransactionStatus
}

type CheckoutEventMap = {
    checkoutStart: void,
    checkoutSuccess: CheckoutSuccess,
    checkoutFailure: CheckoutError,
};

export class CheckoutEventEmitter extends EventEmitter<keyof CheckoutEventMap> {}
