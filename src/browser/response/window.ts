import {JSDOM, ResourceLoader, VirtualConsole} from 'jsdom';

import {BrowserRequestOptionsWindow} from '../request/options/window';
import {BrowserResponseElement} from './element';
import {EventEmitter} from 'events';

export class BrowserResponseWindow {
	public readonly events: EventEmitter;
	public loaded: Boolean;
	public dom: JSDOM;
	public doc: Document;
	public options: BrowserRequestOptionsWindow;

	constructor(events: EventEmitter, res: any, options: BrowserRequestOptionsWindow) {
		if (!events) {
			throw new Error('BrowserResponseWindow init failed - events argument missing.');
		}

		if (!(events instanceof EventEmitter)) {
			throw new Error('BrowserResponseWindow init failed - events argument not an EventEmitter instance.');
		}

		this.options = options;
		this.events = events;
		this.loaded = false;

		this.doc = undefined!;
		this.dom = undefined!;

		try {
			this.load(res);
		} catch (error) {
			throw Error(`BrowserResponseWindow init failed - ${error.message}`);
		}
	}

	public element(selector: string): BrowserResponseElement | null {
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

		return new BrowserResponseElement(this.doc, result);
	}

	public elements(selector: string): BrowserResponseElement[] {
		let results: BrowserResponseElement[] = [];
		if (!this.doc) {
			return results;
		}

		let matches;
		try {
			matches = this.doc.querySelectorAll(selector);
			matches.forEach((match) => {
				const element = new BrowserResponseElement(this.doc, match);
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

	public load(res: any): JSDOM {
		if (this.loaded) {
			return this.dom;
		}

		if (!res) {
			throw Error('BrowserResponseWindow load failed - no res given.');
		}

		const runScripts = this.options.executeJavascript.get(false) ? 'dangerously' : undefined;

		const virtualConsole = new VirtualConsole();

		virtualConsole.on('error', (...data: any[]) => {
			console.error(`VC ERROR: ${data}`);
		});

		virtualConsole.on('log', (...data: any[]) => {
			console.log(`VC LOG: ${data}`);
		});

		virtualConsole.on('trace', (...data: any[]) => {
			console.trace(`VC TRACE: ${data}`);
		});

		const resourceLoader = new ResourceLoader({
			strictSSL: false,
			userAgent: 'Mell/9000'
		});

		this.dom = new JSDOM(res.data, {
			url: 'http://localhost',
			runScripts: runScripts,
			pretendToBeVisual: true,
			contentType: 'text/html',
			virtualConsole: virtualConsole,
			resources: resourceLoader
		});
		this.doc = this.dom.window.document;
		this.loaded = true;

		return this.dom;
	}
}
