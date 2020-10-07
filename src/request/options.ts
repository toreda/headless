import {ArmorKeyBoolean, ArmorKeyStore, ArmorKeyString, ArmorKeyUInt} from '@armorjs/key-store';

import {HBRequestOptionsAdapter} from './options/adapter';
import {HBRequestOptionsHeaders} from './options/headers';
import {HBRequestOptionsLog} from './options/log';
import {HBRequestOptionsWindow} from './window';

export class HBRequestOptions extends ArmorKeyStore {
	public readonly window: HBRequestOptionsWindow;
	public readonly log: HBRequestOptionsLog;
	public readonly headers: HBRequestOptionsHeaders;
	public readonly method: ArmorKeyString;
	public readonly adapter: HBRequestOptionsAdapter;
	public readonly timeout: ArmorKeyUInt;

	constructor() {
		super();
		this.window = new HBRequestOptionsWindow();
		this.adapter = new HBRequestOptionsAdapter();
		this.log = new HBRequestOptionsLog();
		this.headers = new HBRequestOptionsHeaders();
		this.method = new ArmorKeyString('get');
		this.timeout = new ArmorKeyUInt(10000);
	}
}
