import {ArmorBrowserRequestAdapter} from './adapter';
import {ArmorBrowserRequestHeaders} from '../headers';
import {ArmorBrowserRequestOptions} from '../options/options';
import axios from 'axios';

export class ArmorBrowserRequestAdapterHttp implements ArmorBrowserRequestAdapter {
	public readonly id: string;

	constructor() {
		this.id = 'http';
	}

	public get(url: string | null, headers: ArmorBrowserRequestHeaders): Promise<any> {
		return new Promise((resolve, reject) => {
			headers.method.update('GET');

			if (!url) {
				return null;
			}

			axios
				.get(url, {headers})
				.then((res) => {
					return resolve(res);
				})
				.catch((e) => {
					return reject(e);
				});
		});
	}

	public post(url: string | null, headers: ArmorBrowserRequestHeaders, payload: any): Promise<any> {
		return new Promise((resolve, reject) => {
			headers.method.update('POST');

			if (!url) {
				return null;
			}

			axios
				.post(url, payload, {headers})
				.then((res) => {
					return resolve(res);
				})
				.catch((e) => {
					return reject(e);
				});
		});
	}
}
