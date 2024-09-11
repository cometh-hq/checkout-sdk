/** MESSAGES **/

export interface ResponseErrorDTO {
    message: string
}

export interface ResponseCheckoutTransactionDTO {
    transactionId: string
    txHash: string
}

export interface EventResponseDTO {
    type: EventType
    data: ResponseErrorDTO | any
    success: boolean
}

export interface EventRequestDTO {
    type: EventType
    data: any
}

export type MessageEventResp = MessageEvent<EventResponseDTO>

export enum EventType {
    DISPLAY_READY = 'DISPLAY_READY',
    CHECKOUT_TRANSACTION = 'CHECKOUT_TRANSACTION',
    CLOSE_DISPLAY = 'CLOSE_DISPLAY'
}
