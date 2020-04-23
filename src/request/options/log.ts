import {ArmorKeyBoolean, ArmorKeyGroup, ArmorKeyString} from '@armorjs/key';

export class ArmorHeadlessRequestOptionsLog extends ArmorKeyGroup {
	public readonly enabled: ArmorKeyBoolean;

	public readonly writeToDisk: {
		enabled: ArmorKeyBoolean;
		atPath: ArmorKeyString;
	};

	constructor() {
		super();
		this.enabled = new ArmorKeyBoolean(false);
		this.writeToDisk = {
			enabled: new ArmorKeyBoolean(false),
			atPath: new ArmorKeyString()
		};
	}
}
