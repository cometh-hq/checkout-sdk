import { type EventRequestDTO, EventType, type MessageEventResp } from './messages/types'

export interface EmbeddedConfiguration {
    defaultURL: string
    authorizedOrigin: string
}

export default abstract class Embedded {

    constructor(protected _config: EmbeddedConfiguration) {
    }

    abstract initialize(): void

    abstract open(url?: string, params?: { [key: string]: string | undefined }): boolean

    abstract close(): void

    abstract sendMessage(message: EventRequestDTO): void

    async waitMessage<T>(type: EventType): Promise<T> {
        return new Promise((resolve, reject) => {
            const handler = (event: MessageEventResp) => {
                if (event.origin !== this._config.authorizedOrigin) {
                    console.log('wrong origin: ', event)
                    return
                }
                if (event.data.type === type) {
                    console.log('received: ', event)
                    window.removeEventListener('message', handler)
                    if (event.data.success) {
                        resolve(event.data.data)
                    } else {
                        reject(event.data.data)
                    }
                }
                if (event.data.type === EventType.CLOSE_DISPLAY) {
                    window.removeEventListener('message', handler)
                    reject({
                        type,
                        data: { message: 'User terminated the flow by closing the modal.' },
                        success: false
                    })
                }
            }
            window.addEventListener('message', handler)
        })
    }

}