import {OptionsToState} from 'src/utility';
import {StrongBoolean, StrongMap, makeBoolean} from '@toreda/strong-types';
import {BrowserRequestOptionsWindow as Options} from '../options/window';

type State = OptionsToState<Options>;

export class BrowserRequestStateWindow extends StrongMap implements State {
	public readonly executeJavascript: StrongBoolean;
	public readonly loadResources: StrongBoolean;

	constructor(options?: Options) {
		super();

		this.executeJavascript = makeBoolean(null, false);
		this.loadResources = makeBoolean(null, true);

		if (options != null) {
			this.parse(options);
		}
	}
}
