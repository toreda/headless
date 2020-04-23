import {ArmorHeadlessRequest} from '../request/request';
import {ArmorHeadlessResponseWindow} from './window';
import {EventEmitter} from 'events';

export class ArmorHeadlessResponse {
	public readonly events: EventEmitter;
	public readonly res: any;
	public readonly wnd: ArmorHeadlessResponseWindow | null;

	constructor(events: EventEmitter, res: any) {
		if (!events) {
			throw new Error('ArmorHeadlessResponse init failed - request.events property missing.');
		}

		if (!(events instanceof EventEmitter)) {
			throw new Error(
				'ArmorHeadlessResponse init failed - request.event property is not an EventEmitter instance.'
			);
		}

		if (!res) {
			throw new Error('ArmorHeadlessResponse init failed - res argument missing.');
		}

		this.res = res;
		this.events = events;
		this.wnd = this.createAndLoadWindow(this.events, res);
	}

	public createAndLoadWindow(events: EventEmitter, res: any): ArmorHeadlessResponseWindow | null {
		let wnd: ArmorHeadlessResponseWindow | null = null;
		try {
			wnd = new ArmorHeadlessResponseWindow(events);
			wnd.load(res);
		} catch (e) {
			console.error(`ArmorHeadlessResponse failed to createAndLoad response window: ${e.message}.`);
		}

		return wnd;
	}
}
