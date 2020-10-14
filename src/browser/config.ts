import {ArmorKeyStore} from '@armorjs/key-store';
import {BrowserConfigGeneral} from './config/general';

export class BrowserConfig extends ArmorKeyStore {
	public readonly general: BrowserConfigGeneral;

	constructor() {
		super();
		this.general = new BrowserConfigGeneral();
	}
}
