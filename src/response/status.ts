import { ArmorKeyStore, ArmorKeyString, ArmorKeyUInt } from '@armorjs/key-store';

export class ArmorHeadlessResponseStatus extends ArmorKeyStore {
	public readonly status: ArmorKeyUInt;
	public readonly statusText: ArmorKeyString;

	constructor(res: any) {
		super();
		this.status = new ArmorKeyUInt();
		this.statusText = new ArmorKeyString();

		if (res) {
			this.status.update(res.status);
			this.statusText.update(res.statusText);
		}
	}
}