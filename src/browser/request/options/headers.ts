import {ArmorKeyStore, ArmorKeyString, ArmorKeyUInt} from '@armorjs/key-store';

import {BrowserRequestHeaders} from '../headers';

export class BrowserRequestOptionsHeaders extends ArmorKeyStore {
	public readonly origin: ArmorKeyString;
	public readonly host: ArmorKeyString;
	public readonly accept: ArmorKeyString;
	public readonly acceptLanguage: ArmorKeyString;
	public readonly acceptEncoding: ArmorKeyString;
	public readonly acceptsCookies: ArmorKeyString;
	public readonly cacheControl: ArmorKeyString;
	public readonly cookie: ArmorKeyString;
	public readonly contentControl: ArmorKeyString;
	public readonly dnt: ArmorKeyUInt;
	public readonly method: ArmorKeyString;
	public readonly pragma: ArmorKeyString;
	public readonly referer: ArmorKeyString;
	public readonly secFetchMode: ArmorKeyString;
	public readonly secFetchSite: ArmorKeyString;
	public readonly secFetchUser: ArmorKeyString;
	public readonly upgradeInsecureRequests: ArmorKeyString;
	public readonly userAgent: ArmorKeyString;
	public readonly xRequestedWith: ArmorKeyString;
	public readonly xMicrosoftAjax: ArmorKeyString;

	constructor() {
		super();
		this.accept = new ArmorKeyString();
		this.acceptEncoding = new ArmorKeyString();
		this.acceptLanguage = new ArmorKeyString();
		this.acceptsCookies = new ArmorKeyString();
		this.cacheControl = new ArmorKeyString();
		this.cookie = new ArmorKeyString();
		this.contentControl = new ArmorKeyString();
		this.dnt = new ArmorKeyUInt(1);
		this.method = new ArmorKeyString('GET');
		this.host = new ArmorKeyString();
		this.pragma = new ArmorKeyString();
		this.origin = new ArmorKeyString();
		this.referer = new ArmorKeyString();
		this.secFetchMode = new ArmorKeyString();
		this.secFetchSite = new ArmorKeyString();
		this.secFetchUser = new ArmorKeyString();
		this.upgradeInsecureRequests = new ArmorKeyString();
		this.userAgent = new ArmorKeyString();
		this.xRequestedWith = new ArmorKeyString();
		this.xMicrosoftAjax = new ArmorKeyString();
	}

	public getAsObject(): BrowserRequestHeaders {
		return {
			Accept: this.accept.get('*/*'),
			AcceptsCookies: this.acceptsCookies.get('yes'),
			'Accept-Encoding': this.acceptEncoding.get('gzip, deflare, br'),
			'Accept-Language': this.acceptLanguage.get('en-US,en;q=0.9'),
			'Cache-Control': this.cacheControl.get('no-cache'),
			Pragma: this.pragma.get('no-cache'),
			Origin: this.origin.get(''),
			Host: this.host.get(''),
			DNT: this.dnt.get(1),
			'Sec-Fetch-Mode': this.secFetchMode.get('cors'),
			'Sec-Fetch-Site': this.secFetchSite.get('same-origin'),
			'User-Agent': this.userAgent.get(''),
			'X-Requested-With': this.xRequestedWith.get('XMLHttpRequest'),
			'X-MicrosoftAjax': this.xMicrosoftAjax.get('Delta=true')
		};
	}
}
