import {EventEmitter} from 'events';
import {HBConfig} from './config';
import {HBRequest} from './request';
import {HBRequestOptions} from './request/options';
import {HBResponse} from './response';

export class HeadlessBrowser {
	public readonly events: EventEmitter;
	public readonly config: HBConfig;

	constructor(options?: any) {
		this.events = options && options.events ? options.events : new EventEmitter();
		this.config = new HBConfig();
		this.config.parse(options || {});
	}

	public async load(
		url: string,
		method: 'GET' | 'POST',
		payload: any = {},
		options?: HBRequestOptions
	): Promise<HBResponse> {
		const requestOptions = options ? options : new HBRequestOptions();
		requestOptions.method.update(method);

		const request = new HBRequest(this.events, url, requestOptions);
		return await request.execute(method, payload);
	}

	public async get(url: string, payload?: any, options?: HBRequestOptions): Promise<HBResponse> {
		return await this.load(url, 'GET', payload, options);
	}

	public async post(url: string, payload: any, options?: HBRequestOptions): Promise<HBResponse> {
		return await this.load(url, 'POST', payload, options);
	}
}
