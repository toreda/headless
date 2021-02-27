import {OptionsToState} from 'src/utility';
import {StrongMap, StrongString, StrongUInt, makeString, makeUInt} from '@toreda/strong-types';
import {BrowserRequestOptions as Options} from './options';
import {BrowserRequestStateAdapter as StateAdapter} from './state/adapter';
import {BrowserRequestStateHeaders as StateHeaders} from './state/headers';
import {BrowserRequestStateLog as StateLog} from './state/log';
import {BrowserRequestStateWindow as StateWindow} from './state/window';

type State = OptionsToState<Options>;

export class BrowserRequestState extends StrongMap implements State {
	public readonly method: StrongString;
	public readonly timeout: StrongUInt;

	public readonly adapter: StateAdapter;
	public readonly headers: StateHeaders;
	public readonly log: StateLog;
	public readonly window: StateWindow;

	constructor(options?: Options) {
		super();

		this.method = makeString(null, 'get');
		this.timeout = makeUInt(null, 10000);

		this.adapter = new StateAdapter();
		this.headers = new StateHeaders();
		this.log = new StateLog();
		this.window = new StateWindow();

		if (options != null) {
			this.parse(options);
		}
	}
}
