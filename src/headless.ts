import {ArmorKeyGroup, ArmorKeyParser} from '@armorjs/key';

import {ArmorHeadlessConfig} from './config';
import {ArmorHeadlessRequest} from './request/request';
import {ArmorHeadlessRequestOptions} from './request/options/options';
import {ArmorHeadlessResponse} from './response/response';
import {EventEmitter} from 'events';

export class ArmorHeadless {
	public readonly events: EventEmitter;
	public readonly config: ArmorKeyGroup;

	constructor(options?: any) {
		this.events = options && options.events ? options.events : new EventEmitter();
		this.config = new ArmorHeadlessConfig();
		const configParser = new ArmorKeyParser();
		configParser.parse(this.config, options);
	}

	public async load(
		url: string,
		method: string,
		options: ArmorHeadlessRequestOptions
	): Promise<ArmorHeadlessResponse> {
		options.method.update(method);
		const request = new ArmorHeadlessRequest(this.events, url, options);
		return await request.execute();
	}

	public async get(url: string, options: ArmorHeadlessRequestOptions): Promise<ArmorHeadlessResponse> {
		return await this.load(url, 'get', options);
	}

	public async post(url: string, options: ArmorHeadlessRequestOptions): Promise<ArmorHeadlessResponse> {
		return await this.load(url, 'post', options);
	}
}
