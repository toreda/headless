import {ArmorBrowserConfig} from './config';
import {ArmorBrowserRequest} from './request/request';
import {ArmorBrowserRequestOptions} from './request/options/options';
import { ArmorBrowserWindow } from './browser-window';
import {EventEmitter} from 'events';

export class ArmorBrowser {
	public readonly events: EventEmitter;
	public readonly config: ArmorBrowserConfig;

	constructor(options?: any) {
		this.events = options && options.events ? options.events : new EventEmitter();
		this.config = new ArmorBrowserConfig(options);
	}

	public async load(url: string, method: string, options: ArmorBrowserRequestOptions): Promise<ArmorBrowserWindow> {
		options.method.update(method);
		const request = new ArmorBrowserRequest(this.events, options);
		const wnd = new ArmorBrowserWindow(this.events);
		return wnd.execute(request);
	}

	public async get(url: string, options: ArmorBrowserRequestOptions): Promise<ArmorBrowserWindow> {
		return this.load(url, 'get', options);
	}

	public async post(url: string, options: ArmorBrowserRequestOptions): Promise<ArmorBrowserWindow> {
		return this.load(url, 'post', options);
	}
}
