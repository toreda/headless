import {ArmorKeyStore, ArmorKeyString} from '@armorjs/key-store';

import {ArmorHeadlessRequestOptionsAdapter} from './adapter';
import {ArmorHeadlessRequestOptionsHeaders} from './headers';
import {ArmorHeadlessRequestOptionsLog} from './log';

export class ArmorHeadlessRequestOptions extends ArmorKeyStore {
	public readonly log: ArmorHeadlessRequestOptionsLog;
	public readonly headers: ArmorHeadlessRequestOptionsHeaders;
	public method: ArmorKeyString;
	public adapter: ArmorHeadlessRequestOptionsAdapter;

	constructor() {
		super();
		this.adapter = new ArmorHeadlessRequestOptionsAdapter();
		this.log = new ArmorHeadlessRequestOptionsLog();
		this.headers = new ArmorHeadlessRequestOptionsHeaders();
		this.method = new ArmorKeyString('get');
	}
}
