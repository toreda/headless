import {ArmorKeyBoolean, ArmorKeyStore, ArmorKeyString, ArmorKeyUInt} from '@armorjs/key-store';

import {HBRequestOptionsAdapter} from './options/adapter';
import {HBRequestOptionsHeaders} from './options/headers';
import {HBRequestOptionsLog} from './options/log';
import {HBRequestOptionsWindow} from './options/window';

export class HBRequestOptions extends ArmorKeyStore {
	public readonly window: HBRequestOptionsWindow;
	public readonly log: HBRequestOptionsLog;
	public readonly headers: HBRequestOptionsHeaders;
	public readonly method: ArmorKeyString;
	public readonly adapter: HBRequestOptionsAdapter;
	public readonly timeout: ArmorKeyUInt;

	constructor() {
		super();
		this.adapter = new HBRequestOptionsAdapter();
		this.headers = new HBRequestOptionsHeaders();
		this.log = new HBRequestOptionsLog();
		this.window = new HBRequestOptionsWindow();
		this.method = new ArmorKeyString('get');
		this.timeout = new ArmorKeyUInt(10000);
	}
}
