import {JSDOM, ResourceLoader, VirtualConsole} from 'jsdom';

import {ArmorKeyUInt} from '@armorjs/key-store';
import {EventEmitter} from 'events';
import {HBElement} from '../element';
import {HBRequestOptions} from '../request/options';
import {HBRequestOptionsWindow} from '../request/window';

export class HBResponseWindow {
	public readonly events: EventEmitter;
	public dom: any;
	public options: HBRequestOptionsWindow;

	constructor(events: EventEmitter, options: HBRequestOptionsWindow) {
		if (!events) {
			throw new Error('HBResponseWindow init failed - events argument missing.');
		}

		if (!(events instanceof EventEmitter)) {
			throw new Error('HBResponseWindow init failed - events argument not an EventEmitter instance.');
		}

		this.dom = null;
		this.options = options;
		this.events = events;
	}

	public elements(selector: string): HBElement[] {
		let results: HBElement[] = [];
		if (!this.dom || !this.dom.window || !this.dom.window.document) {
			return results;
		}

		let matches;
		try {
			matches = this.dom.window.document.querySelectorAll(selector);
			if (Array.isArray(matches)) {
				matches.forEach((match) => {
					const element = new HBElement(this.dom.window.document, match);
					results.push(element);
				});
			}
		} catch (e) {}

		return results;
	}

	public element(selector: string): HBElement | null {
		if (!this.dom || !this.dom.window || !this.dom.window.document) {
			return null;
		}

		let result: HTMLElement | null;

		try {
			result = this.dom.window.document.querySelector(selector);
		} catch (e) {
			result = null;
		}

		if (!result) {
			return null;
		}

		return new HBElement(this.dom.window.document, result);
	}

	public title(): string | null {
		if (!this.dom) {
			return null;
		}

		const element = this.element('title');

		if (!element) {
			return null;
		}

		return element.text();
	}

	public async load(res: any): Promise<any> {
		if (!res) {
			console.warn('Request load aborted - no response provided');
			return;
		}

		let dom: any = null;

		const runScripts = this.options.executeJavascript.get(false) ? 'dangerously' : undefined;

		try {
			const virtualConsole = new VirtualConsole();
			virtualConsole.on('error', (...data: any[]) => {
				console.info('VC Error: ', data);
			});

			virtualConsole.on('info', (...data: any[]) => {
				console.info('VC INFO: ', data);
			});

			virtualConsole.on('log', (...data: any[]) => {
				console.log('VC LOG: ', data);
			});

			const resourceLoader = new ResourceLoader({
				strictSSL: false,
				userAgent: 'Mell/9000'
			});

			dom = await new JSDOM(res.data, {
				runScripts: runScripts,
				pretendToBeVisual: true,
				url: 'http://localhost',
				contentType: 'text/html',
				virtualConsole: virtualConsole,
				resources: 'usable'
			});
		} catch (e) {
			console.error(`Headless response window failed to parse dom: ${e.message}.`);
			dom = null;
		}

		this.dom = dom;
	}
}
