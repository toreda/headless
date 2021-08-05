import {OptionsToState} from 'src/utility';
import {StrongBoolean, StrongMap, StrongString, makeBoolean, makeString} from '@toreda/strong-types';
import {BrowserRequestOptionsLog as Options} from '../options/log';

type State = OptionsToState<Options>;

export class BrowserRequestStateLog extends StrongMap implements State {
	public readonly enabled: StrongBoolean;

	public readonly writeToDisk: {
		enabled: StrongBoolean;
		atPath: StrongString;
	};

	constructor(options?: Options) {
		super();

		this.enabled = makeBoolean(null, false);
		this.writeToDisk = {
			atPath: makeString(null, ''),
			enabled: makeBoolean(null, false)
		};

		if (options != null) {
			this.parse(options);
		}
	}
}
