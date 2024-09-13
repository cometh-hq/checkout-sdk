import {type EventRequestDTO} from './messages/types'
import Embedded from './embedded'
import {buildURL} from '@/utils/safeURL'

export default class IFrame extends Embedded {
    private _modalID = 'modal-cometh-web-checkout'
    private _modal: HTMLElement | null = null
    private _iframeID = 'cometh-web-checkout'
    private _iframe: HTMLIFrameElement | null = null

    private _prepareModal(modalId: string) {
        const modal = document.createElement('div')
        modal.id = modalId
        modal.style.position = 'fixed'
        modal.style.top = '0px'
        modal.style.right = '0px'
        modal.style.left = '0px'
        modal.style.bottom = '0px'
        modal.style.display = 'none'
        modal.style.zIndex = '1000'
        return modal
    }

    private _createModal() {
        const existingModal = document.getElementById(this._modalID)
        if (existingModal) {
            this._modal = existingModal
            return
        }
        const modal = this._prepareModal(this._modalID)
        document.body.appendChild(modal)
        this._modal = modal
    }

    private _createIframe() {
        if (this._iframe) {
            return
        }
        const existingIframe = document.getElementById(this._iframeID)
        if (existingIframe) {
            this._iframe = existingIframe as HTMLIFrameElement
            return
        }
        console.log('Creating iframe', this._modal)
        const iframe = document.createElement('iframe')
        iframe.id = this._iframeID
        iframe.allow = ''
        iframe.sandbox.add('allow-forms')
        iframe.sandbox.add('allow-scripts')
        iframe.sandbox.add('allow-same-origin')
        iframe.style.width = '100%'
        iframe.style.height = '100%'
        this._iframe = iframe
        this._modal?.appendChild(iframe)
    }

    private _hideModal() {
        if (this._modal) {
            this._modal.style.display = 'none'
        }
    }

    private _showModal() {
        if (this._modal) {
            this._modal.style.display = 'block'
        }
    }

    initialize() {
        this._createModal()
        this._createIframe()
    }

    open(url?: string, params?: { [key: string]: string | undefined }): boolean {
        const target = url || this._config.defaultURL
        const formatedURL = buildURL(target, params)
        if (!this._iframe) return false
        this._iframe.src = formatedURL
        this._showModal()
        return true
    }

    close() {
        this._hideModal()
    }

    sendMessage(message: EventRequestDTO) {
        if (this._iframe?.contentWindow) {
            this._iframe.contentWindow.postMessage(message, '*')
        }
    }
}
