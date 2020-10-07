import {JSDOM, ResourceLoader, VirtualConsole} from 'jsdom';

import {EventEmitter} from 'events';
import {HBRequestOptionsWindow} from '../request/options/window';
import {HBResponseElement} from './element';

export class HBResponseWindow {
	public readonly events: EventEmitter;
	public dom: JSDOM | null;
	public doc: Document | null;
	public options: HBRequestOptionsWindow;

	constructor(events: EventEmitter, options: HBRequestOptionsWindow) {
		if (!events) {
			throw new Error('HBResponseWindow init failed - events argument missing.');
		}

		if (!(events instanceof EventEmitter)) {
			throw new Error('HBResponseWindow init failed - events argument not an EventEmitter instance.');
		}

		this.doc = null;
		this.dom = null;
		this.options = options;
		this.events = events;
	}

	public element(selector: string): HBResponseElement | null {
		if (!this.doc) {
			return null;
		}

		let result: HTMLElement | null;

		try {
			result = this.doc.querySelector(selector);
		} catch (e) {
			result = null;
		}

		if (!result) {
			return null;
		}

		return new HBResponseElement(this.doc, result);
	}

	public elements(selector: string): HBResponseElement[] {
		let results: HBResponseElement[] = [];
		if (!this.doc) {
			return results;
		}

		let matches;
		try {
			matches = this.doc.querySelectorAll(selector);
			matches.forEach((match) => {
				const element = new HBResponseElement(this.doc, match);
				results.push(element);
			});
		} catch (e) {
			return [];
		}

		return results;
	}

	public title(): string | null {
		if (!this.doc) {
			return null;
		}

		return this.doc.title;
	}

	public async load(res: any): Promise<any> {
		if (!res) {
			return null;
		}

		let dom: JSDOM | null = null;

		const runScripts = this.options.executeJavascript.get(false) ? 'dangerously' : undefined;

		try {
			const virtualConsole = new VirtualConsole();
			virtualConsole.on('error', (...data: any[]) => {});

			virtualConsole.on('info', (...data: any[]) => {});

			virtualConsole.on('log', (...data: any[]) => {});

			const resourceLoader = new ResourceLoader({
				strictSSL: false,
				userAgent: 'Mell/9000'
			});

			dom = new JSDOM(res.data, {
				url: 'http://localhost',
				runScripts: runScripts,
				pretendToBeVisual: true,
				contentType: 'text/html',
				virtualConsole: virtualConsole,
				resources: 'usable'
			});
		} catch (e) {}

		this.dom = dom;

		if (dom) {
			this.doc = dom.window.document;
		}

		return dom;
	}
}
