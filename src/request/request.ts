import {ArmorBrowserRequestOptions} from './options/options';
import {ArmorBrowserResponse} from '../response/response';
import {EventEmitter} from 'events';

export class ArmorBrowserRequest {
	public readonly events: EventEmitter;
	public readonly options: ArmorBrowserRequestOptions;

	constructor(events: EventEmitter, options: ArmorBrowserRequestOptions) {
		if (!events) {
			throw new Error('ArmorRequest init failed - events argument missing.');
		}

		if (!options) {
			throw new Error('ArmorRequest init failed - options argument missing.');
		}

		this.events = events;
		this.options = options;
	}

	public async execute(): Promise<ArmorBrowserResponse> {
		return this;
	}
}
