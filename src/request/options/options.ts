import {ArmorConfig, ArmorConfigKeyString} from '@armorjs/config';

import {ArmorBrowserRequestOptionsAdapter} from './adapter';
import {ArmorBrowserRequestOptionsHeaders} from './headers';
import {ArmorBrowserRequestOptionsLog} from './log';

export class ArmorBrowserRequestOptions extends ArmorConfig {
	public readonly log: ArmorBrowserRequestOptionsLog;
	public readonly headers: ArmorBrowserRequestOptionsHeaders;
	public method: ArmorConfigKeyString;
	public adapter: ArmorBrowserRequestOptionsAdapter;

	constructor() {
		super();
		this.adapter = new ArmorBrowserRequestOptionsAdapter();
		this.log = new ArmorBrowserRequestOptionsLog();
		this.headers = new ArmorBrowserRequestOptionsHeaders();
		this.method = new ArmorConfigKeyString('get');
	}
}
