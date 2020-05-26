import { ArmorKeyBoolean, ArmorKeyStore, ArmorKeyString, ArmorKeyUInt } from '@armorjs/key-store';

import {ArmorHeadlessRequestOptionsAdapter} from './options/adapter';
import {ArmorHeadlessRequestOptionsHeaders} from './options/headers';
import {ArmorHeadlessRequestOptionsLog} from './options/log';
import { ArmorHeadlessRequestOptionsWindow } from './window';

export class ArmorHeadlessRequestOptions extends ArmorKeyStore {
	public readonly window: ArmorHeadlessRequestOptionsWindow;
	public readonly log: ArmorHeadlessRequestOptionsLog;
	public readonly headers: ArmorHeadlessRequestOptionsHeaders;
	public readonly method: ArmorKeyString;
	public readonly adapter: ArmorHeadlessRequestOptionsAdapter;
	public readonly timeout: ArmorKeyUInt;

	constructor() {
		super();
		this.window = new ArmorHeadlessRequestOptionsWindow();
		this.adapter = new ArmorHeadlessRequestOptionsAdapter();
		this.log = new ArmorHeadlessRequestOptionsLog();
		this.headers = new ArmorHeadlessRequestOptionsHeaders();
		this.method = new ArmorKeyString('get');
		this.timeout = new ArmorKeyUInt(10000);
	}
}
