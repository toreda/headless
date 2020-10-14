import {ArmorKeyBoolean, ArmorKeyStore, ArmorKeyString, ArmorKeyUInt} from '@armorjs/key-store';

import {BrowserRequestOptionsAdapter} from './options/adapter';
import {BrowserRequestOptionsHeaders} from './options/headers';
import {BrowserRequestOptionsLog} from './options/log';
import {BrowserRequestOptionsWindow} from './options/window';

export class BrowserRequestOptions extends ArmorKeyStore {
	public readonly window: BrowserRequestOptionsWindow;
	public readonly log: BrowserRequestOptionsLog;
	public readonly headers: BrowserRequestOptionsHeaders;
	public readonly method: ArmorKeyString;
	public readonly adapter: BrowserRequestOptionsAdapter;
	public readonly timeout: ArmorKeyUInt;

	constructor() {
		super();
		this.adapter = new BrowserRequestOptionsAdapter();
		this.headers = new BrowserRequestOptionsHeaders();
		this.log = new BrowserRequestOptionsLog();
		this.window = new BrowserRequestOptionsWindow();
		this.method = new ArmorKeyString('get');
		this.timeout = new ArmorKeyUInt(10000);
	}
}
