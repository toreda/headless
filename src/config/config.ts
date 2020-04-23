import {ArmorHeadlessConfigGeneral} from './group';
import {ArmorKeyStore} from '@armorjs/key-store';

export class ArmorHeadlessConfig extends ArmorKeyStore {
	public readonly general: ArmorHeadlessConfigGeneral;

	constructor() {
		super();
		this.general = new ArmorHeadlessConfigGeneral();
	}
}
