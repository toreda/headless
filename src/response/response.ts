import {ArmorBrowserRequest} from '../request/request';
import {EventEmitter} from 'events';

export class ArmorBrowserResponse {
	public readonly events: EventEmitter;
	public readonly res: any;

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
	}


}
