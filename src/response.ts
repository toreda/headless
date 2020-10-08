import {ArmorKeyString} from '@armorjs/key-store';
import {EventEmitter} from 'events';
import {HBRequestOptions} from './request/options';
import {HBRequestOptionsWindow} from './request/options/window';
import {HBResponseElement} from './response/element';
import {HBResponseStatus} from './response/status';
import {HBResponseWindow} from './response/window';

export class HBResponse {
	public readonly events: EventEmitter;
	public readonly res: any;
	public readonly status: HBResponseStatus;
	public readonly url: ArmorKeyString;
	public readonly options: HBRequestOptions;
	public wnd: HBResponseWindow | null;
	public loaded: boolean;

	constructor(events: EventEmitter, res: any, options: HBRequestOptions) {
		if (!events) {
			throw new Error('HBResponse init failed - request.events property missing.');
		}

		if (!(events instanceof EventEmitter)) {
			throw new Error('HBResponse init failed - request.event property is not an EventEmitter instance.');
		}

		this.loaded = false;
		this.options = options;
		this.res = res ? res : null;
		this.url = this.createUrl(res);
		this.status = new HBResponseStatus(res);
		this.events = events;
		this.wnd = null;
	}

	public createUrl(res: any): ArmorKeyString {
		const url = new ArmorKeyString();

		if (res && res.config) {
			url.update(res.config.url);
		}

		return url;
	}

	public async load(): Promise<any> {
		if (this.loaded) {
			return false;
		}

		this.wnd = await this.createAndLoadWindow(this.events, this.res, this.options.window);
		return this.wnd;
	}

	public async createAndLoadWindow(
		events: EventEmitter,
		res: any,
		options: HBRequestOptionsWindow
	): Promise<HBResponseWindow | null> {
		let wnd: HBResponseWindow | null = null;
		try {
			wnd = new HBResponseWindow(events, options);
			await wnd.load(res);
			this.loaded = true;
		} catch (e) {
			wnd = null;
		}

		return wnd;
	}

	public getBody(): HBResponseElement | null {
		if (!this.wnd) {
			return null;
		}

		const element = this.wnd.element('body');

		if (!element) {
			return null;
		}

		return element;
	}

	public async click(selector: string): Promise<any> {
		if (!this.loaded) {
			throw Error('headless response click failed - response has not finished loading.');
		}

		if (!this.wnd) {
			throw Error(`headless response click failed - response window not found.`);
		}

		const element = this.wnd.element(selector);

		if (!element) {
			throw Error(`headless response click failed - no elements with '${selector}' not found in response.`);
		}

		element.click();
		return true;
	}
}
