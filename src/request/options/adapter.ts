import {ArmorConfigGroup, ArmorConfigKeyBoolean, ArmorConfigKeyString} from '@armorjs/config';

export class ArmorHeadlessRequestOptionsAdapter extends ArmorConfigGroup {
	public readonly id: ArmorConfigKeyString;
	public readonly httpFallback: {
		enabled: ArmorConfigKeyBoolean;
	};

	constructor() {
		super();
		this.id = new ArmorConfigKeyString('http');
		this.httpFallback = {
			enabled: new ArmorConfigKeyBoolean()
		};
	}
}
