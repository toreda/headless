import {ArmorBrowserRequestAdapter} from './adapter';
import {ArmorBrowserRequestHeaders} from '../headers';

export class ArmorBrowserRequestAdapterMock implements ArmorBrowserRequestAdapter {
	public readonly id: string;

	constructor() {
		this.id = 'mock';
	}

	public get(url: string | null, headers: ArmorBrowserRequestHeaders): Promise<any> {
		return new Promise((resolve, reject) => {
			return resolve();
		});
	}

	public post(url: string | null, headers: ArmorBrowserRequestHeaders, payload: any): Promise<any> {
		return new Promise((resolve, reject) => {
			return resolve();
		});
	}
}
