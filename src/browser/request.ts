import {EventEmitter} from 'events';
import {Any} from 'src/aliases';
import {BrowserRequestAdapter} from './request/adapter';
import {BrowserRequestAdapterFile} from './request/adapter/file';
import {BrowserRequestAdapterHttp} from './request/adapter/http';
import {BrowserRequestAdapterMock} from './request/adapter/mock';
import {BrowserRequestState as State} from './request/state';
import {BrowserResponse} from './response';

export class BrowserRequest {
	public readonly url: string | null;
	public readonly events: EventEmitter;
	public readonly state: State;
	public readonly adapter: BrowserRequestAdapter;

	constructor(events: EventEmitter, url: string | null, state: State) {
		if (!events) {
			throw new Error('BrowserRequest init failed - events argument missing.');
		}

		if (!(events instanceof EventEmitter)) {
			throw new Error('BrowserRequest init failed - events argument is not an EventEmitter instance.');
		}

		if (!state) {
			throw new Error('BrowserRequest init failed - state argument missing.');
		}

		this.url = url;

		this.adapter = this.createAdapter(state.adapter.id());
		this.events = events;
		this.state = state;
	}

	public createAdapter(adapterId: string): BrowserRequestAdapter {
		switch (adapterId) {
			case 'mock':
				return new BrowserRequestAdapterMock();
			case 'https':
				return new BrowserRequestAdapterHttp();
			case 'http':
				return new BrowserRequestAdapterHttp();
			case 'file':
				return new BrowserRequestAdapterFile();
			default:
				return new BrowserRequestAdapterHttp();
		}
	}

	public async execute(method: 'GET' | 'POST' = 'GET', payload?: Any): Promise<BrowserResponse> {
		const headers = this.state.headers.getAsObject();

		let result: Any = null;

		switch (method) {
			case 'POST':
				result = await this.adapter.post(this.url, headers, payload);
				break;
			case 'GET':
				result = await this.adapter.get(this.url, headers);
				break;
			default:
				result = await this.adapter.get(this.url, headers);
				break;
		}

		return this.createResponse(this.events, result);
	}

	public createResponse(events: EventEmitter, res: Any): BrowserResponse {
		return new BrowserResponse(events, res, this.state);
	}
}
