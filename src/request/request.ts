import {ArmorBrowserRequestAdapter} from './adapter/adapter';
import {ArmorBrowserRequestAdapterHttp} from './adapter/http';
import {ArmorBrowserRequestAdapterMock} from './adapter/mock';
import {ArmorBrowserRequestOptions} from './options/options';
import {ArmorBrowserRequestOptionsHeaders} from './options/headers';
import { ArmorBrowserResponse } from '../response/response';
import {EventEmitter} from 'events';

export class ArmorBrowserRequest {
	public readonly url: string | null;
	public readonly events: EventEmitter;
	public readonly options: ArmorBrowserRequestOptions;
	public readonly adapter: ArmorBrowserRequestAdapter;

	constructor(events: EventEmitter, url: string | null, options: ArmorBrowserRequestOptions) {
		if (!events) {
			throw new Error('ArmorBrowserRequest init failed - events argument missing.');
		}

		if (!options) {
			throw new Error('ArmorBrowserRequest init failed - options argument missing.');
		}

		this.url = url;

		this.adapter = this.createAdapter(options.adapter.id.get('http'));
		this.events = events;
		this.options = options;
	}

	public async execute(): Promise<ArmorBrowserResponse> {
		const method = this.options.method.get('GET');
		const headers = this.options.headers.get();
		const payload = {};

		let result: any = null;
		switch (method) {
			case 'POST':
				result = await this.adapter.post(this.url, headers, payload);
				break;
			case 'GET':
				result = await this.adapter.get(this.url, headers);
				break;
			default:
				result = await this.adapter.get(this.url, headers);
				break;
		}

		return new ArmorBrowserResponse(this.events, result);
	}

	public createAdapter(adapterId: string): ArmorBrowserRequestAdapter {
		switch (adapterId) {
			case 'mock':
				return new ArmorBrowserRequestAdapterMock();
			case 'https':
				return new ArmorBrowserRequestAdapterHttp();
			case 'http':
				return new ArmorBrowserRequestAdapterHttp();
			default:
				return new ArmorBrowserRequestAdapterHttp();
		}
	}
}
