import { type EventRequestDTO } from '@/core/app/messages/types'
import Embedded from '@/core/app/embedded'
import { buildURL } from '@/utils/safeURL'

export default class Tab extends Embedded {
	private _tab: Window | null = null
	private _tabURL: string | null = null

	initialize() {}

	private _createTab(url: string): Window {
		const tab = window.open(
			url,
			'_blank'
		)
		if (!tab) {
			throw new Error('Tab window failed to open')
		}
		return tab
	}

	open(url?: string, params?: { [key: string]: string | undefined }): boolean {
		const target = url || this._config.defaultURL
		if (this._tab && !this._tab.closed) {
			if (this._tabURL === target) {
				this._tab.focus()
				return false
			}
		}
		const formatedURL = buildURL(target, params)
		this._tabURL = target
		this._tab = this._createTab(formatedURL.toString())
		this._tab.focus()
		return true
	}

	close() {
		if (!this._tab || this._tab.closed) return
		this._tab.close()
	}

	sendMessage(message: EventRequestDTO) {
		if (!this._tab) return
		this._tab.postMessage(message, '*')
	}
}
