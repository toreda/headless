import { ArmorBrowserRequest } from './request/request';
import {ArmorBrowserRequestOptions} from './request/options';
import {EventEmitter} from 'events';
import axios from 'axios';

export class ArmorBrowserWindow  {
	public readonly events: EventEmitter;

	constructor(events: EventEmitter) {
		this.events = events;
	}

	public async execute(request: ArmorBrowserRequest): Promise<ArmorBrowserWindow> {

		return this;
	}

	public async get(url: string, options: ArmorBrowserRequestOptions): Promise<ArmorBrowserWindow> {
		options.method.update('get');
		const request = new ArmorBrowserRequest(this.events, options);
		return this.execute(request);
	}

	public async post(url: string, options: ArmorBrowserRequestOptions): Promise<ArmorBrowserWindow> {
		options.method.update('post');
		const request = new ArmorBrowserRequest(this.events, options);
		return this.execute(request);
	}
}
