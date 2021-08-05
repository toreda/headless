import {EventEmitter} from 'events';
import {Any} from './aliases';
import {BrowserRequest as Request} from './browser/request';
import {BrowserRequestState as State} from './browser/request/state';
import {BrowserResponse as Response} from './browser/response';

export class Browser {
	public readonly events: EventEmitter;

	constructor(events?: EventEmitter) {
		this.events = events ?? new EventEmitter();
	}

	public async load(url: string, method: methods, payload: Any = {}, state?: State): Promise<Response> {
		const requestState = state ?? new State();
		requestState.method(method);

		const request = new Request(this.events, url, requestState);

		return await request.execute(method, payload);
	}

	public async get(url: string, payload?: Any, state?: State): Promise<Response> {
		return await this.load(url, 'GET', payload, state);
	}

	public async post(url: string, payload: Any, state?: State): Promise<Response> {
		return await this.load(url, 'POST', payload, state);
	}
}

type methods = 'GET' | 'POST';
