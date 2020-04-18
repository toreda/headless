import {ArmorConfig, ArmorConfigKeyString} from '@armorjs/config';

import {ArmorRequestOptionsAdapter} from './adapter';
import {ArmorRequestOptionsHeaders} from './headers';
import {ArmorRequestOptionsLog} from './log';

export class ArmorRequestOptions extends ArmorConfig {
	public readonly log: ArmorRequestOptionsLog;
	public readonly headers: ArmorRequestOptionsHeaders;
	public method: ArmorConfigKeyString;
	public adapter: ArmorRequestOptionsAdapter;

	constructor() {
		super();
		this.adapter = new ArmorRequestOptionsAdapter();
		this.log = new ArmorRequestOptionsLog();
		this.headers = new ArmorRequestOptionsHeaders();
		this.method = new ArmorConfigKeyString('get');
	}
}
