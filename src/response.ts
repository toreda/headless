import {ArmorKeyString} from '@armorjs/key-store';
import {EventEmitter} from 'events';
import {HBRequestOptions} from './request/options';
import {HBRequestOptionsWindow} from './request/options/window';
import {HBResponseElement} from './response/element';
import {HBResponseStatus} from './response/status';
import {HBResponseWindow} from './response/window';
import {HeadlessBrowser} from './headless';
import Path from 'path';

export class HBResponse {
	public readonly events: EventEmitter;
	public readonly res: any;
	public readonly status: HBResponseStatus;
	public readonly url: ArmorKeyString;
	public readonly origin: ArmorKeyString;
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
		this.origin = this.createOrigin(this.url.get(''));
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

		if (this.options.adapter.id.get('http') === 'file') {
			url.update(Path.resolve(res.url));
			return url;
		}

		if (res && res.config) {
			url.update(res.config.url);
		}

		return url;
	}

	public createOrigin(url: string): ArmorKeyString {
		const origin = new ArmorKeyString();

		if (this.options.adapter.id.get('http') === 'file') {
			origin.update(url.replace(this.res.url, ''));
			return origin;
		}

		if (url) {
			origin.update(new URL(url).origin);
		}

		return origin;
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

	public handleFormElement(element: any): string {
		if (!element?.name) {
			return '';
		}

		if (element.nodeName === 'TEXTAREA') {
			return element.textContent || '';
		}

		if (element.nodeName === 'SELECT') {
			return element.value || '';
		}

		if (element.nodeName !== 'INPUT') {
			return '';
		}

		if (element.type === 'checkbox') {
			return element.checked ? element.value || 'on' : '';
		}

		return element.value || '';
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

		const hbEle = this.getElement(selector);

		if (!hbEle) {
			return false;
		}

		hbEle.click();
		return true;
	}

	public async followLink(selector: string): Promise<HBResponse> {
		const hbEle = this.getElement(selector);

		if (!hbEle || hbEle.element.nodeName !== 'A') {
			throw Error('HBResponse followLink failed - no anchor link found.');
		}

		const link: HTMLAnchorElement = hbEle.element as HTMLAnchorElement;

		const origin = this.origin.get('');
		const hrefLiteral = link.getAttribute('href');
		const hrefResolve = link.href;

		let url: string;
		let protocol: string = '';

		if (hrefLiteral === hrefResolve) {
			url = hrefLiteral;
			protocol = hrefLiteral.split(':')[0];
		} else {
			url = origin + hrefLiteral;
			protocol = this.options.adapter.id.get('');
		}

		const hb = new HeadlessBrowser({events: this.events});
		this.options.adapter.id.update(protocol);
		return hb.get(url, null, this.options);
	}

	public async submitForm(selector: string): Promise<HBResponse> {
		const hbEle = this.getElement(selector);

		if (!hbEle || (hbEle.element as HTMLInputElement).type !== 'submit') {
			throw Error('HBResponse submitForm failed - no submit button found.');
		}

		const submit: HTMLInputElement = hbEle.element as HTMLInputElement;
		const form = submit.form;

		if (!form) {
			throw Error('HBResponse submitForm failed - no form found.');
		}

		const method = form.method.toLowerCase();
		const action = new URL(form.action).pathname;
		const origin = this.origin.get('');
		let url = origin + action;

		let search = [].filter
			.call(form.elements, (elm: any) => {
				return !!elm.name;
			})
			.map((elm: any) => {
				return `${elm.name}=${this.handleFormElement(elm)}`;
			})
			.join('&');

		if (method === 'get') {
			url += `?${search}`;
		}

		const hb = new HeadlessBrowser({events: this.events});

		return hb.load(url, method === 'post' ? 'POST' : 'GET', search, this.options);
	}
}
