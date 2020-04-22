import { ArmorConfig, ArmorConfigParser } from '@armorjs/config';

import {ArmorBrowserConfig} from './config';
import {ArmorBrowserRequest} from './request/request';
import {ArmorBrowserRequestOptions} from './request/options/options';
import {ArmorBrowserWindow} from './browser-window';
import {EventEmitter} from 'events';

export class ArmorBrowser {
	public readonly events: EventEmitter;
	public readonly config: ArmorBrowserConfig;

	constructor(options?: any) {
		this.events = options && options.events ? options.events : new EventEmitter();
		this.config = new ArmorBrowserConfig();
		const configParser = new ArmorConfigParser()
		configParser.parse(this.config, options);
	}

	public async load(url: string, method: string, options: ArmorBrowserRequestOptions): Promise<ArmorBrowserWindow> {
		options.method.update(method);
		const request = new ArmorBrowserRequest(this.events, options);
		const wnd = new ArmorBrowserWindow(this.events, this.config);
		return wnd.execute(url, options);
	}

	public async get(url: string, options: ArmorBrowserRequestOptions): Promise<ArmorBrowserWindow> {
		return this.load(url, 'get', options);
	}

	public async post(url: string, options: ArmorBrowserRequestOptions): Promise<ArmorBrowserWindow> {
		return this.load(url, 'post', options);
	}
}
