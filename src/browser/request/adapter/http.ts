import axios from 'axios';
import {Any} from 'src/aliases';
import {BrowserRequestAdapter} from '../adapter';
import {BrowserRequestHeaders as Headers} from '../headers';

export class BrowserRequestAdapterHttp implements BrowserRequestAdapter {
	public readonly id: string;

	constructor() {
		this.id = 'http';
	}

	public get(url: string | null, headers: Headers): Promise<Any> {
		return new Promise((resolve, reject) => {
			headers.method = 'GET';

			if (typeof url !== 'string') {
				return reject(new Error('BrowserRequestAdapterHttp get failed - url is not a string.'));
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

	public post(url: string | null, headers: Headers, payload: Any): Promise<Any> {
		return new Promise((resolve, reject) => {
			headers.method = 'POST';

			if (typeof url !== 'string') {
				return reject(new Error('BrowserRequestAdapterHttp post failed - url is not a string.'));
			}

			axios
				.post(url, payload, {headers: headers})
				.then((res) => {
					return resolve(res);
				})
				.catch((e) => {
					return reject(e);
				});
		});
	}
}
