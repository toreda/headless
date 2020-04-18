import {ArmorBrowserConfigGeneral} from './group';

export class ArmorBrowserConfig {
	public readonly general: ArmorBrowserConfigGeneral;

	constructor() {
		this.general = new ArmorBrowserConfigGeneral();
	}
}
