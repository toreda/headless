import {ArmorKeyBoolean, ArmorKeyStore, ArmorKeyString} from '@armorjs/key-store';

export class HBRequestOptionsWindow extends ArmorKeyStore {
	public readonly executeJavascript: ArmorKeyBoolean;
	public readonly loadResources: ArmorKeyBoolean;

	constructor() {
		super();
		this.executeJavascript = new ArmorKeyBoolean(false);
		this.loadResources = new ArmorKeyBoolean(true);
	}
}
