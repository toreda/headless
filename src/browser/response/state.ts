import {AnyObj} from 'src/aliases';
import {StrongMap, StrongString, StrongUInt, makeString, makeUInt} from '@toreda/strong-types';

export class BrowserResponseState extends StrongMap {
	public readonly status: StrongUInt;
	public readonly statusText: StrongString;

	constructor(options: AnyObj = {}) {
		super();

		this.status = makeUInt(null, 0);
		this.statusText = makeString(null, '');

		this.parse(options);
	}
}
