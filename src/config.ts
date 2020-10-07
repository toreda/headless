import {ArmorKeyStore} from '@armorjs/key-store';
import {HBConfigGeneral} from './config/group/general';

export class HBConfig extends ArmorKeyStore {
	public readonly general: HBConfigGeneral;

	constructor() {
		super();
		this.general = new HBConfigGeneral();
	}
}
