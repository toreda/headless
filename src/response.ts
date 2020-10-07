import {ArmorKeyString} from '@armorjs/key-store';
import {EventEmitter} from 'events';
import {HBElement} from './element';
import {HBRequest} from './request';
import {HBRequestOptions} from './request/options';
import {HBRequestOptionsWindow} from './request/window';
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

	public async load(): Promise<any> {
		if (this.loaded) {
			return;
		}

		this.wnd = await this.createAndLoadWindow(this.events, this.res, this.options.window);
	}

	public createUrl(res: any): ArmorKeyString {
		const url = new ArmorKeyString();
		if (res && res.config) {
			url.update(res.config.url);
		}

		return url;
	}

	public getBody(): HBElement | null {
		return null;
	}

	public async click(selector: string): Promise<any> {
		if (!this.loaded) {
			console.error(`headless response click failed - response has not finished loading.`);
			return null;
		}

		if (!this.wnd) {
			console.error(`headless response click failed - response window not found.`);
			return null;
		}

		const element = this.wnd.element(selector);

		if (!element) {
			console.error(`headless response click failed - no elements with '${selector}' not found in response.`);
			return null;
		}

		element.click();
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
		} catch (e) {
			console.error(`HBResponse failed to createAndLoad response window: ${e.message}.`);
			wnd = null;
		}

		return wnd;
	}
}
