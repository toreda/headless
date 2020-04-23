import {ArmorHeadlessRequestAdapter} from './adapter';
import {ArmorHeadlessRequestHeaders} from '../headers';
import {ArmorHeadlessRequestOptions} from '../options/options';
import {ArmorHeadlessRequestOptionsHeaders} from '../options/headers';
import axios from 'axios';

export class ArmorHeadlessRequestAdapterHttp implements ArmorHeadlessRequestAdapter {
	public readonly id: string;

	constructor() {
		this.id = 'http';
	}

	public get(url: string | null, headers: ArmorHeadlessRequestOptionsHeaders): Promise<any> {
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

	public post(url: string | null, headers: ArmorHeadlessRequestOptionsHeaders, payload: any): Promise<any> {
		return new Promise((resolve, reject) => {
			headers.method.update('POST');

			if (!url) {
				return null;
			}

			axios
				.post(url, payload, {headers: headers.getAsObject()})
				.then((res) => {
					return resolve(res);
				})
				.catch((e) => {
					return reject(e);
				});
		});
	}
}
