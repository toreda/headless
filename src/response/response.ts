import {ArmorBrowserRequest} from '../request/request';
import {ArmorBrowserResponseWindow} from './window';
import {EventEmitter} from 'events';

export class ArmorBrowserResponse {
	public readonly events: EventEmitter;
	public readonly res: any;
	public readonly wnd: ArmorBrowserResponseWindow | null;

	constructor(events: EventEmitter, res: any) {
		if (!events) {
			throw new Error('ArmorBrowserResponse init failed - request.events property missing.');
		}

		if (!(events instanceof EventEmitter)) {
			throw new Error(
				'ArmorBrowserResponse init failed - request.event property is not an EventEmitter instance.'
			);
		}

		if (!res) {
			throw new Error('ArmorBrowserResponse init failed - res argument missing.');
		}

		this.res = res;
		this.events = events;
		this.wnd = this.createAndLoadWindow(this.events, res);
	}

	public createAndLoadWindow(events: EventEmitter, res: any): ArmorBrowserResponseWindow | null {
		let wnd: ArmorBrowserResponseWindow | null = null;
		try {
			wnd = new ArmorBrowserResponseWindow(events);
			wnd.load(res);
		} catch (e) {
			console.error(`ArmorBrowserResponse failed to createAndLoad response window: ${e.message}.`);
		}

		return wnd;
	}
}
