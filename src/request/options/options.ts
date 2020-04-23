import {ArmorConfig, ArmorConfigKeyString} from '@armorjs/config';

import {ArmorHeadlessRequestOptionsAdapter} from './adapter';
import {ArmorHeadlessRequestOptionsHeaders} from './headers';
import {ArmorHeadlessRequestOptionsLog} from './log';

export class ArmorHeadlessRequestOptions extends ArmorConfig {
	public readonly log: ArmorHeadlessRequestOptionsLog;
	public readonly headers: ArmorHeadlessRequestOptionsHeaders;
	public method: ArmorConfigKeyString;
	public adapter: ArmorHeadlessRequestOptionsAdapter;

	constructor() {
		super();
		this.adapter = new ArmorHeadlessRequestOptionsAdapter();
		this.log = new ArmorHeadlessRequestOptionsLog();
		this.headers = new ArmorHeadlessRequestOptionsHeaders();
		this.method = new ArmorConfigKeyString('get');
	}
}
