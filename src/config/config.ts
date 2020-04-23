import {ArmorHeadlessConfigGeneral} from './group';

export class ArmorHeadlessConfig {
	public readonly general: ArmorHeadlessConfigGeneral;

	constructor() {
		this.general = new ArmorHeadlessConfigGeneral();
	}
}
