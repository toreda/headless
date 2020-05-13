import {ArmorHeadlessConfig} from './config';
import {ArmorHeadlessRequest} from './request';
import {ArmorHeadlessRequestOptions} from './request/options';
import {ArmorHeadlessResponse} from './response';
import {EventEmitter} from 'events';

export class ArmorHeadless {
	public readonly events: EventEmitter;
	public readonly config: ArmorHeadlessConfig;

	constructor(options?: any) {
		this.events = options && options.events ? options.events : new EventEmitter();
		this.config = new ArmorHeadlessConfig();
		this.config.parse(options);
	}

	public async load(
		url: string,
		method: string,
		options?: ArmorHeadlessRequestOptions
	): Promise<ArmorHeadlessResponse> {
		const requestOptions = options ? options : new ArmorHeadlessRequestOptions();
		requestOptions.method.update(method);

		const request = new ArmorHeadlessRequest(this.events, url, requestOptions);
		return await request.execute();
	}

	public async get(url: string, options?: ArmorHeadlessRequestOptions): Promise<ArmorHeadlessResponse> {
		return await this.load(url, 'get', options);
	}

	public async post(url: string, options?: ArmorHeadlessRequestOptions): Promise<ArmorHeadlessResponse> {
		return await this.load(url, 'post', options);
	}
}
