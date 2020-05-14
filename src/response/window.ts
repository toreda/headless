import { ArmorKeyUInt } from '@armorjs/key-store';
import {EventEmitter} from 'events';

export class ArmorHeadlessResponseWindow {
	public readonly events: EventEmitter;

	constructor(events: EventEmitter) {
		if (!events) {
			throw new Error('ArmorHeadlessResponseWindow init failed - events argument missing.')
		}

		if (!(events instanceof EventEmitter)){
			throw new Error('ArmorHeadlessResponseWindow init failed - events argument not an EventEmitter instance.');
		}

		this.events = events;
	}

	public load(res: any): void {
		if (!res) {
			console.warn('Request load aborted - no response provided');
			return;
		}

	}

}
