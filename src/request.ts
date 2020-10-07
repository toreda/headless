import {EventEmitter} from 'events';
import {HBRequestAdapter} from './request/adapter';
import {HBRequestAdapterFile} from './request/adapter/file';
import {HBRequestAdapterHttp} from './request/adapter/http';
import {HBRequestAdapterMock} from './request/adapter/mock';
import {HBRequestOptions} from './request/options';
import {HBRequestOptionsHeaders} from './request/options/headers';
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

		if (!options) {
			throw new Error('HBRequest init failed - options argument missing.');
		}

		this.url = url;

		this.adapter = this.createAdapter(options.adapter.id.get('http'));
		this.events = events;
		this.options = options;
	}

	public async execute(): Promise<HBResponse> {
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
		return await this.createResponse(this.events, result);
	}

	public async createResponse(events: EventEmitter, res: any): Promise<HBResponse> {
		this.options.window.executeJavascript.update(true);
		const response = new HBResponse(events, res, this.options);
		await response.load();
		return response;
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
}
