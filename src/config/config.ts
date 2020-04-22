import {ArmorBrowserConfigGeneral} from './group';

export class ArmorBrowserConfig {
	public readonly general: ArmorBrowserConfigGeneral;

	constructor(options?: any) {
		this.general = new ArmorBrowserConfigGeneral(options);
	}
}
