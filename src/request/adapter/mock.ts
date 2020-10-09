import {HBRequestAdapter} from '../adapter';
import {HBRequestHeaders} from '../headers';

export class HBRequestAdapterMock implements HBRequestAdapter {
	public readonly id: string;

	constructor() {
		this.id = 'mock';
	}

	public get(url: string | null, headers: HBRequestHeaders): Promise<any> {
		return new Promise((resolve, reject) => {
			return resolve({});
		});
	}

	public post(url: string | null, headers: HBRequestHeaders, payload: any): Promise<any> {
		return new Promise((resolve, reject) => {
			return resolve({});
		});
	}
}
