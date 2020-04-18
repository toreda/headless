import {ArmorConfigGroup, ArmorConfigKeyBoolean, ArmorConfigKeyString} from '@armorjs/config';

export class ArmorRequestOptionsLog extends ArmorConfigGroup {
	public readonly enabled: ArmorConfigKeyBoolean;

	public readonly writeToDisk: {
		enabled: ArmorConfigKeyBoolean;
		atPath: ArmorConfigKeyString;
	};

	constructor() {
		super();
		this.enabled = new ArmorConfigKeyBoolean(false);
		this.writeToDisk = {
			enabled: new ArmorConfigKeyBoolean(false),
			atPath: new ArmorConfigKeyString()
		};
	}
}
