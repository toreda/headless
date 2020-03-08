import {ArmorHBConfigGroupGeneral} from './config/group';

export class ArmorHBConfig {
	public readonly general: ArmorHBConfigGroupGeneral;

	constructor() {
		this.general = new ArmorHBConfigGroupGeneral();
	}
}
