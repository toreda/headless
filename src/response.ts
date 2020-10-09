import {ArmorKeyString} from '@armorjs/key-store';
import {EventEmitter} from 'events';
import {HBRequestOptions} from './request/options';
import {HBRequestOptionsWindow} from './request/options/window';
import {HBResponseElement} from './response/element';
import {HBResponseStatus} from './response/status';
import {HBResponseWindow} from './response/window';
import {HeadlessBrowser} from './headless';

export class HBResponse {
	public readonly events: EventEmitter;
	public readonly res: any;
	public readonly status: HBResponseStatus;
	public readonly url: ArmorKeyString;
	public readonly options: HBRequestOptions;
	public win: HBResponseWindow;
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

		try {
			this.win = this.load();
		} catch (error) {
			throw Error(`HBResponse init failed - ${error.message}`);
		}
	}

	public createUrl(res: any): ArmorKeyString {
		const url = new ArmorKeyString();

		if (res && res.config) {
			url.update(res.config.url);
		}

		return url;
	}

	public load(): HBResponseWindow {
		if (this.loaded) {
			return this.win;
		}

		return this.createAndLoadWindow(this.options.window);
	}

	public createAndLoadWindow(options?: HBRequestOptionsWindow): HBResponseWindow {
		let win: HBResponseWindow;

		try {
			win = new HBResponseWindow(this.events, this.res, options || this.options.window);
		} catch (error) {
			throw Error(`HBResponse createAndLoadWindow failed - ${error.message}`);
		}

		this.loaded = true;

		return win;
	}

	public getBody(): HBResponseElement {
		const element = this.win.element('body');

		if (!element) {
			throw Error('HBResponse getBody failed - no body element');
		}

		return element;
	}

	public getElement(selector: string): HBResponseElement | null {
		if (!this.loaded) {
			return null;
		}

		if (!this.win) {
			return null;
		}

		const element = this.win.element(selector);

		if (!element) {
			return null;
		}

		return element;
	}

	public click(selector: string): boolean {
		if (!this.loaded) {
			return false;
		}

		if (!this.win) {
			return false;
		}

		const element = this.getElement(selector);

		if (!element) {
			return false;
		}

		element.click();
		return true;
	}

	public async submitForm(selector: string): Promise<HBResponse> {
		const hbEle = this.getElement(selector);

		if (!hbEle || (hbEle.element as HTMLInputElement).type !== 'submit') {
			throw Error('HBResponse submiteForm failed - no submit button found.');
		}

		const submit: HTMLInputElement = hbEle.element as HTMLInputElement;
		const form = submit.form;

		if (!form) {
			throw Error('HBResponse submiteForm failed - no form found.');
		}

		const method = form.method.toLowerCase();
		const action = new URL(form.action).pathname;
		const hostname = this.url.get('').split('/').slice(0, 3).join('/');

		let search = [].filter
			.call(form.elements, (elm: any) => {
				return !!elm.name;
			})
			.map((elm: any) => {
				return `${elm.name}=${elm.value || elm.textContent}`;
			})
			.join('&');

		const url = hostname + action + (method === 'get' ? `?${search}` : '');

		const hb = new HeadlessBrowser({events: this.events});
		return hb[method](url, search);
	}
}
