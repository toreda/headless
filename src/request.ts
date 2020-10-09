import {EventEmitter} from 'events';
import {HBRequestAdapter} from './request/adapter';
import {HBRequestAdapterFile} from './request/adapter/file';
import {HBRequestAdapterHttp} from './request/adapter/http';
import {HBRequestAdapterMock} from './request/adapter/mock';
import {HBRequestOptions} from './request/options';
import {HBResponse} from './response';

export class HBRequest {
	public readonly url: string | null;
	public readonly events: EventEmitter;
	public readonly options: HBRequestOptions;
	public readonly adapter: HBRequestAdapter;

	constructor(events: EventEmitter, url: string | null, options: HBRequestOptions) {
		if (!events) {
			throw new Error('HBRequest init failed - events argument missing.');
		}

		if (!(events instanceof EventEmitter)) {
			throw new Error('HBRequest init failed - events argument is not an EventEmitter instance.');
		}

		if (!options) {
			throw new Error('HBRequest init failed - options argument missing.');
		}

		this.url = url;

		this.adapter = this.createAdapter(options.adapter.id.get('http'));
		this.events = events;
		this.options = options;
	}

	public createAdapter(adapterId: string): HBRequestAdapter {
		switch (adapterId) {
			case 'mock':
				return new HBRequestAdapterMock();
			case 'https':
				return new HBRequestAdapterHttp();
			case 'http':
				return new HBRequestAdapterHttp();
			case 'file':
				return new HBRequestAdapterFile();
			default:
				return new HBRequestAdapterHttp();
		}
	}

	public async execute(method: 'GET' | 'POST' = 'GET', payload?: any): Promise<HBResponse> {
		const headers = this.options.headers.getAsObject();

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

		return this.createResponse(this.events, result);
	}

	public createResponse(events: EventEmitter, res: any): HBResponse {
		this.options.window.executeJavascript.update(true);
		return new HBResponse(events, res, this.options);
	}
}
