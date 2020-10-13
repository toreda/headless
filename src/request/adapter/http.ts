import {HBRequestAdapter} from '../adapter';
import {HBRequestHeaders} from '../headers';
import axios from 'axios';

export class HBRequestAdapterHttp implements HBRequestAdapter {
	public readonly id: string;

	constructor() {
		this.id = 'http';
	}

	public get(url: string | null, headers: HBRequestHeaders): Promise<any> {
		return new Promise((resolve, reject) => {
			headers.method = 'GET';

			if (typeof url !== 'string') {
				return reject(new Error('HBRequestAdapterHttp get failed - url is not a string.'));
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

			if (typeof url !== 'string') {
				return reject(new Error('HBRequestAdapterHttp post failed - url is not a string.'));
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
