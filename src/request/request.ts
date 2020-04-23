import {ArmorHeadlessRequestAdapter} from './adapter/adapter';
import {ArmorHeadlessRequestAdapterHttp} from './adapter/http';
import {ArmorHeadlessRequestAdapterMock} from './adapter/mock';
import {ArmorHeadlessRequestOptions} from './options/options';
import {ArmorHeadlessRequestOptionsHeaders} from './options/headers';
import {ArmorHeadlessResponse} from '../response/response';
import {EventEmitter} from 'events';

export class ArmorHeadlessRequest {
	public readonly url: string | null;
	public readonly events: EventEmitter;
	public readonly options: ArmorHeadlessRequestOptions;
	public readonly adapter: ArmorHeadlessRequestAdapter;

	constructor(events: EventEmitter, url: string | null, options: ArmorHeadlessRequestOptions) {
		if (!events) {
			throw new Error('ArmorHeadlessRequest init failed - events argument missing.');
		}

		if (!options) {
			throw new Error('ArmorHeadlessRequest init failed - options argument missing.');
		}

		this.url = url;

		this.adapter = this.createAdapter(options.adapter.id.get('http'));
		this.events = events;
		this.options = options;
	}

	public async execute(): Promise<ArmorHeadlessResponse> {
		const method = this.options.method.get('GET');
		const headers = this.options.headers.getAsObject();
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

		return new ArmorHeadlessResponse(this.events, result);
	}

	public createAdapter(adapterId: string): ArmorHeadlessRequestAdapter {
		switch (adapterId) {
			case 'mock':
				return new ArmorHeadlessRequestAdapterMock();
			case 'https':
				return new ArmorHeadlessRequestAdapterHttp();
			case 'http':
				return new ArmorHeadlessRequestAdapterHttp();
			default:
				return new ArmorHeadlessRequestAdapterHttp();
		}
	}
}
