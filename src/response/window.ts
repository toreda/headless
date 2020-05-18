import {ArmorHeadlessElement} from '../element';
import { ArmorHeadlessRequestOptions } from '../request/options';
import { ArmorHeadlessRequestOptionsWindow } from '../request/window';
import {ArmorKeyUInt} from '@armorjs/key-store';
import {EventEmitter} from 'events';
import {JSDOM} from 'jsdom';

export class ArmorHeadlessResponseWindow {
	public readonly events: EventEmitter;
	public dom: any;
	public options: ArmorHeadlessRequestOptionsWindow;
	//public resourceLoader: any;

	constructor(events: EventEmitter, options: ArmorHeadlessRequestOptionsWindow) {
		if (!events) {
			throw new Error('ArmorHeadlessResponseWindow init failed - events argument missing.');
		}

		if (!(events instanceof EventEmitter)) {
			throw new Error('ArmorHeadlessResponseWindow init failed - events argument not an EventEmitter instance.');
		}

		this.dom = null;
		this.options = options;
		this.events = events;
	}

	public element(selector: string): ArmorHeadlessElement | null {
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

		return new ArmorHeadlessElement(this.dom.window.document, result);
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

	public load(res: any): void {
		if (!res) {
			console.warn('Request load aborted - no response provided');
			return;
		}

		let dom: any = null;

		const runScripts = this.options.executeJavascript.get(false) ? undefined : 'dangerously';

		try {
			dom = new JSDOM(res.data, {
				runScripts: runScripts
			});
		} catch (e) {
			console.error(`Headless response window failed to parse dom: ${e.message}.`);
			dom = null;
		}

		this.dom = dom;
	}
}
