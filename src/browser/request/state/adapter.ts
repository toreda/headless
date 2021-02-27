import {OptionsToState} from 'src/utility';
import {StrongBoolean, StrongMap, StrongString, makeBoolean, makeString} from '@toreda/strong-types';
import {BrowserRequestOptionsAdapter as Options} from '../options/adapter';

type State = OptionsToState<Options>;

export class BrowserRequestStateAdapter extends StrongMap implements State {
	public readonly fallback: StrongBoolean;
	public readonly id: StrongString;

	constructor(options?: Options) {
		super();

		this.fallback = makeBoolean(null, true);
		this.id = makeString(null, 'http');

		if (options != null) {
			this.parse(options);
		}
	}
}
