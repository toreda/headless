import {ArmorConfigKeyString, ArmorConfigKeyUInt} from '@armorjs/config';

import {ArmorHeadlessRequestHeaders} from '../headers';

export class ArmorHeadlessRequestOptionsHeaders {
	public readonly origin: ArmorConfigKeyString;
	public readonly host: ArmorConfigKeyString;
	public readonly accept: ArmorConfigKeyString;
	public readonly acceptLanguage: ArmorConfigKeyString;
	public readonly acceptEncoding: ArmorConfigKeyString;
	public readonly acceptsCookies: ArmorConfigKeyString;
	public readonly cacheControl: ArmorConfigKeyString;
	public readonly cookie: ArmorConfigKeyString;
	public readonly contentControl: ArmorConfigKeyString;
	public readonly dnt: ArmorConfigKeyUInt;
	public readonly method: ArmorConfigKeyString;
	public readonly pragma: ArmorConfigKeyString;
	public readonly referer: ArmorConfigKeyString;
	public readonly secFetchMode: ArmorConfigKeyString;
	public readonly secFetchSite: ArmorConfigKeyString;
	public readonly secFetchUser: ArmorConfigKeyString;
	public readonly upgradeInsecureRequests: ArmorConfigKeyString;
	public readonly userAgent: ArmorConfigKeyString;
	public readonly xRequestedWith: ArmorConfigKeyString;
	public readonly xMicrosoftAjax: ArmorConfigKeyString;

	constructor() {
		this.accept = new ArmorConfigKeyString();
		this.acceptEncoding = new ArmorConfigKeyString();
		this.acceptLanguage = new ArmorConfigKeyString();
		this.acceptsCookies = new ArmorConfigKeyString();
		this.cacheControl = new ArmorConfigKeyString();
		this.cookie = new ArmorConfigKeyString();
		this.contentControl = new ArmorConfigKeyString();
		this.dnt = new ArmorConfigKeyUInt(1);
		this.method = new ArmorConfigKeyString('GET');
		this.host = new ArmorConfigKeyString();
		this.pragma = new ArmorConfigKeyString();
		this.origin = new ArmorConfigKeyString();
		this.referer = new ArmorConfigKeyString();
		this.secFetchMode = new ArmorConfigKeyString();
		this.secFetchSite = new ArmorConfigKeyString();
		this.secFetchUser = new ArmorConfigKeyString();
		this.upgradeInsecureRequests = new ArmorConfigKeyString();
		this.userAgent = new ArmorConfigKeyString();
		this.xRequestedWith = new ArmorConfigKeyString();
		this.xMicrosoftAjax = new ArmorConfigKeyString();
	}

	public getAsObject(): ArmorHeadlessRequestHeaders {
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
