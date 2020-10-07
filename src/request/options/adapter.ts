import {ArmorKeyBoolean, ArmorKeyStore, ArmorKeyString} from '@armorjs/key-store';

export class HBRequestOptionsAdapter extends ArmorKeyStore {
	public readonly id: ArmorKeyString;
	public readonly httpFallback: {
		enabled: ArmorKeyBoolean;
	};

	constructor() {
		super();
		this.id = new ArmorKeyString('http');
		this.httpFallback = {
			enabled: new ArmorKeyBoolean()
		};
	}
}
