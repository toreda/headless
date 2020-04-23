import {ArmorHeadlessConfigGeneral} from './group';
import {ArmorKeyGroup} from '@armorjs/key';

export class ArmorHeadlessConfig extends ArmorKeyGroup {
	public readonly general: ArmorHeadlessConfigGeneral;

	constructor() {
		super();
		this.general = new ArmorHeadlessConfigGeneral();
	}
}
