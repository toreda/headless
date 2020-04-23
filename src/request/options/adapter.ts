import {ArmorKeyBoolean, ArmorKeyGroup, ArmorKeyString} from '@armorjs/key';

export class ArmorHeadlessRequestOptionsAdapter extends ArmorKeyGroup {
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
