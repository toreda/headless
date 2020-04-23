import {ArmorKeyGroup, ArmorKeyString} from '@armorjs/key';

import {ArmorHeadlessRequestOptionsAdapter} from './adapter';
import {ArmorHeadlessRequestOptionsHeaders} from './headers';
import {ArmorHeadlessRequestOptionsLog} from './log';

export class ArmorHeadlessRequestOptions extends ArmorKeyGroup {
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
