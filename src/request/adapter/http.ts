import {HBRequestAdapter} from '../adapter';
import {HBRequestHeaders} from '../headers';
import {HBRequestOptions} from '../options';
import {HBRequestOptionsHeaders} from '../options/headers';
import axios from 'axios';

export class HBRequestAdapterHttp implements HBRequestAdapter {
	public readonly id: string;

	constructor() {
		this.id = 'http';
	}

	public get(url: string | null, headers: HBRequestHeaders): Promise<any> {
		return new Promise((resolve, reject) => {
			headers.method = 'GET';

			if (!url) {
				return reject(null);
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

	public post(url: string | null, headers: HBRequestHeaders, payload: any): Promise<any> {
		return new Promise((resolve, reject) => {
			headers.method = 'POST';

			if (!url) {
				return reject(null);
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
