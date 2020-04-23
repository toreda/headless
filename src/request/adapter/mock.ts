import {ArmorHeadlessRequestAdapter} from './adapter';
import {ArmorHeadlessRequestHeaders} from '../headers';
import { ArmorHeadlessRequestOptionsHeaders } from '../options/headers';

export class ArmorHeadlessRequestAdapterMock implements ArmorHeadlessRequestAdapter {
	public readonly id: string;

	constructor() {
		this.id = 'mock';
	}

	public get(url: string | null, headers: ArmorHeadlessRequestOptionsHeaders): Promise<any> {
		return new Promise((resolve, reject) => {
			return resolve();
		});
	}

	public post(url: string | null, headers: ArmorHeadlessRequestOptionsHeaders, payload: any): Promise<any> {
		return new Promise((resolve, reject) => {
			return resolve();
		});
	}
}
