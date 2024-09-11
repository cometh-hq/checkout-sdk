import Embedded, { type EmbeddedConfiguration } from '@/core/app/embedded'
import type { DisplayMode } from '@/configuration'
import IFrame from '@/core/app/iframe'
import Popup from '@/core/app/popup'
import Tab from "@/core/app/tab";

const embeddedFactory = (display: DisplayMode, config: EmbeddedConfiguration): Embedded => {
	switch (display) {
		case 'iframe':
			return new IFrame(config)
		case 'popup':
			return new Popup(config)
		case 'tab':
			return new Tab(config)
		default:
			throw new Error('Invalid display mode')
	}
}

export default embeddedFactory
