import {ArmorBrowserRequestAdapter} from './adapter/adapter';
import {ArmorBrowserRequestAdapterHttp} from './adapter/http';
import {ArmorBrowserRequestAdapterMock} from './adapter/mock';
import {ArmorBrowserRequestOptions} from './options/options';
import {ArmorBrowserResponse} from '../response/response';
import {EventEmitter} from 'events';

export class ArmorBrowserRequest {
	public readonly events: EventEmitter;
	public readonly options: ArmorBrowserRequestOptions;
	public readonly adapter: ArmorBrowserRequestAdapter;

	constructor(events: EventEmitter, options: ArmorBrowserRequestOptions) {
		if (!events) {
			throw new Error('ArmorBrowserRequest init failed - events argument missing.');
		}

		if (!options) {
			throw new Error('ArmorBrowserRequest init failed - options argument missing.');
		}

		this.adapter = this.createAdapter(options.adapter.id.get('http'));
		this.events = events;
		this.options = options;
	}

	public async execute(): Promise<ArmorBrowserResponse> {
		return this;
	}

	public createAdapter(adapterId: string): ArmorBrowserRequestAdapter {
		switch (adapterId) {
			case 'mock':
				return new ArmorBrowserRequestAdapterMock();
			case 'https':
				return new ArmorBrowserRequestAdapterHttp();
			case 'http':
				return new ArmorBrowserRequestAdapterHttp();
			default:
				return new ArmorBrowserRequestAdapterHttp();
		}
	}
}
