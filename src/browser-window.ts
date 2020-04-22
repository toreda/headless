import {ArmorBrowserConfig} from './config/config';
import {ArmorBrowserRequest} from './request/request';
import {ArmorBrowserRequestOptions} from './request/options';
import {EventEmitter} from 'events';

export class ArmorBrowserWindow {
	public readonly events: EventEmitter;
	public readonly config: ArmorBrowserConfig;

	constructor(events: EventEmitter, config: ArmorBrowserConfig) {
		this.events = events;
		this.config = config;
	}

	public async execute(url: string, options: ArmorBrowserRequestOptions): Promise<ArmorBrowserWindow> {
		this.validateOptions(options);
		const request = new ArmorBrowserRequest(this.events, options);
		return this;
	}

	public async get(url: string, options: ArmorBrowserRequestOptions): Promise<ArmorBrowserWindow> {
		options.method.update('get');
		return this.execute(url, options);
	}

	public async post(url: string, options: ArmorBrowserRequestOptions): Promise<ArmorBrowserWindow> {
		options.method.update('post');
		return this.execute(url, options);
	}

	public validateOptions(options: ArmorBrowserRequestOptions): void {
		if (!options.method.getUnsafe()) {
			throw new Error(`Request failed - options.method is missing or an invalid
			request method. Supported methods: GET, HEAD, POST, PUT, DELETE, OPTIONS,
			CONNECT, TRACE, PATCH.`);
		}
	}
}
