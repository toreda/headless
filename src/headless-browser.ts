import { EventEmitter } from 'events';
export class ArmorHeadlessBrowser {
	public readonly events: EventEmitter;

	constructor(events: EventEmitter) {
		this.events = events;
	}
}