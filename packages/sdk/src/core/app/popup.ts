import { type EventRequestDTO } from '@/core/app/messages/types'
import Embedded from '@/core/app/embedded'
import { buildURL } from '@/utils/safeURL'

const POPUP_WIDTH = 620
const POPUP_HEIGHT = 740

export default class Popup extends Embedded {
	private _popup: Window | null = null
	private _popupURL: string | null = null

	initialize() {}

	private _createPopup(url: string): Window {
		const left = (window.innerWidth - POPUP_WIDTH) / 2 + window.screenX
		const top = (window.innerHeight - POPUP_HEIGHT) / 2 + window.screenY
		const popup = window.open(
			url,
			'Smart Checkout',
			`width=${POPUP_WIDTH}, height=${POPUP_HEIGHT}, left=${left}, top=${top}`
		)
		if (!popup) {
			throw new Error('Pop up window failed to open')
		}
		return popup
	}

	open(url?: string, params?: { [key: string]: string | undefined }): boolean {
		const target = url || this._config.defaultURL
		if (this._popup && !this._popup.closed) {
			if (this._popupURL === target) {
				this._popup.focus()
				return false
			}
		}
		const formatedURL = buildURL(target, params)
		this._popupURL = target
		this._popup = this._createPopup(formatedURL.toString())
		this._popup.focus()
		return true
	}

	close() {
		if (!this._popup || this._popup.closed) return
		this._popup.close()
	}

	sendMessage(message: EventRequestDTO) {
		if (!this._popup) return
		this._popup.postMessage(message, '*')
	}
}
