import { ArmorKeyUInt } from '@armorjs/key-store';
import {EventEmitter} from 'events';
import {JSDOM} from 'jsdom';

export class ArmorHeadlessResponseWindow {
	public readonly events: EventEmitter;
	public dom: any;

	constructor(events: EventEmitter) {
		if (!events) {
			throw new Error('ArmorHeadlessResponseWindow init failed - events argument missing.')
		}

		if (!(events instanceof EventEmitter)){
			throw new Error('ArmorHeadlessResponseWindow init failed - events argument not an EventEmitter instance.');
		}
		this.dom = null;
		this.events = events;
	}

	public element(selector: string): HTMLElement|null {
		if (!this.dom || !this.dom.window || !this.dom.window.document) {
			return null;
		}

		return this.dom.window.document.querySelector(selector);
	}

	public text(selector: string): string|null {
		const element = this.element(selector);
		if (!element) {
			return null;
		}

		return element.innerHTML;
	}

	public title(): string|null {
		if (!this.dom) {
			return null;
		}

		return this.text('title');
	}

	public load(res: any): void {
		if (!res) {
			console.warn('Request load aborted - no response provided');
			return;
		}

		console.log('res.data: ', res.data);
		let dom: any = null;

		try {
			dom = new JSDOM(res.data);
		} catch (e) {
			console.error(`Headless response window failed to parse dom: ${e.message}.`);
			dom = null;
		}

		this.dom = dom;
	}

}
