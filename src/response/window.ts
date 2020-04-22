import {EventEmitter} from 'events';

export class ArmorBrowserResponseWindow {
	public readonly events: EventEmitter;

	constructor(events: EventEmitter) {
		if (!events) {
			throw new Error('ArmorBrowserResponseWindow init failed - events argument missing.')
		}

		if (!(events instanceof EventEmitter)){
			throw new Error('ArmorBrowserResponseWindow init failed - events argument not an EventEmitter instance.');
		}

		this.events = events;
	}

	public load(res: any): void {}
}
