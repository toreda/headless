import {Any} from 'src/aliases';
import {BrowserRequestAdapter} from '../adapter';

export class BrowserRequestAdapterMock implements BrowserRequestAdapter {
	public readonly id: string;

	constructor() {
		this.id = 'mock';
	}

	public get(): Promise<Any> {
		return new Promise((resolve) => {
			return resolve({});
		});
	}

	public post(): Promise<Any> {
		return new Promise((resolve) => {
			return resolve({});
		});
	}
}
