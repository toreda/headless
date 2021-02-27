import {OptionsToState} from 'src/utility';
import {StrongMap, StrongString, StrongUInt, makeString, makeUInt} from '@toreda/strong-types';
import {BrowserRequestHeaders as Headers} from '../headers';
import {BrowserRequestOptionsHeaders as Options} from '../options/headers';

type State = OptionsToState<Options>;

export class BrowserRequestStateHeaders extends StrongMap implements State {
	public readonly accept: StrongString;
	public readonly acceptEncoding: StrongString;
	public readonly acceptLanguage: StrongString;
	public readonly acceptsCookies: StrongString;
	public readonly cacheControl: StrongString;
	public readonly contentControl: StrongString;
	public readonly cookie: StrongString;
	public readonly dnt: StrongUInt;
	public readonly host: StrongString;
	public readonly method: StrongString;
	public readonly origin: StrongString;
	public readonly pragma: StrongString;
	public readonly referer: StrongString;
	public readonly secFetchMode: StrongString;
	public readonly secFetchSite: StrongString;
	public readonly secFetchUser: StrongString;
	public readonly upgradeInsecureRequests: StrongString;
	public readonly userAgent: StrongString;
	public readonly xMicrosoftAjax: StrongString;
	public readonly xRequestedWith: StrongString;

	constructor(options?: Options) {
		super();

		this.accept = makeString(null, '*/*');
		this.acceptEncoding = makeString(null, 'gzip, deflare, br');
		this.acceptLanguage = makeString(null, 'en-US,en;q=0.9');
		this.acceptsCookies = makeString(null, 'yes');
		this.cacheControl = makeString(null, 'no-cache');
		this.contentControl = makeString(null, '');
		this.cookie = makeString(null, '');
		this.dnt = makeUInt(null, 1);
		this.host = makeString(null, '');
		this.method = makeString(null, 'GET');
		this.origin = makeString(null, '');
		this.pragma = makeString(null, 'no-cache');
		this.referer = makeString(null, '');
		this.secFetchMode = makeString(null, 'cors');
		this.secFetchSite = makeString(null, 'same-origin');
		this.secFetchUser = makeString(null, '');
		this.upgradeInsecureRequests = makeString(null, '');
		this.userAgent = makeString(null, '');
		this.xMicrosoftAjax = makeString(null, 'Delta=true');
		this.xRequestedWith = makeString(null, 'XMLHttpRequest');

		if (options != null) {
			this.parse(options);
		}
	}

	public getAsObject(): Headers {
		return {
			'Accept-Encoding': this.acceptEncoding(),
			'Accept-Language': this.acceptLanguage(),
			Accept: this.accept(),
			AcceptsCookies: this.acceptsCookies(),
			'Cache-Control': this.cacheControl(),
			DNT: this.dnt(),
			Host: this.host(),
			Origin: this.origin(),
			Pragma: this.pragma(),
			'Sec-Fetch-Mode': this.secFetchMode(),
			'Sec-Fetch-Site': this.secFetchSite(),
			'User-Agent': this.userAgent(),
			'X-MicrosoftAjax': this.xMicrosoftAjax(),
			'X-Requested-With': this.xRequestedWith()
		};
	}
}
