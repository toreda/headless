import {ArmorHeadlessElement} from './element';
import {ArmorHeadlessRequest} from './request';
import {ArmorHeadlessRequestOptions} from './request/options';
import {ArmorHeadlessRequestOptionsWindow} from './request/window';
import {ArmorHeadlessResponseStatus} from './response/status';
import {ArmorHeadlessResponseWindow} from './response/window';
import {ArmorKeyString} from '@armorjs/key-store';
import {EventEmitter} from 'events';

export class ArmorHeadlessResponse {
	public readonly events: EventEmitter;
	public readonly res: any;
	public readonly status: ArmorHeadlessResponseStatus;
	public readonly url: ArmorKeyString;
	public readonly options: ArmorHeadlessRequestOptions;
	public wnd: ArmorHeadlessResponseWindow | null;
	public loaded: boolean;

	constructor(events: EventEmitter, res: any, options: ArmorHeadlessRequestOptions) {
		if (!events) {
			throw new Error('ArmorHeadlessResponse init failed - request.events property missing.');
		}

		if (!(events instanceof EventEmitter)) {
			throw new Error(
				'ArmorHeadlessResponse init failed - request.event property is not an EventEmitter instance.'
			);
		}

		this.loaded = false;
		this.options = options;
		this.res = res ? res : null;
		this.url = this.createUrl(res);
		this.status = new ArmorHeadlessResponseStatus(res);
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

	public getBody(): ArmorHeadlessElement | null {
		return null;
	}

	public async createAndLoadWindow(
		events: EventEmitter,
		res: any,
		options: ArmorHeadlessRequestOptionsWindow
	): Promise<ArmorHeadlessResponseWindow | null> {
		let wnd: ArmorHeadlessResponseWindow | null = null;
		try {
			wnd = new ArmorHeadlessResponseWindow(events, options);
			await wnd.load(res);
		} catch (e) {
			console.error(`ArmorHeadlessResponse failed to createAndLoad response window: ${e.message}.`);
		}

		return wnd;
	}
}
