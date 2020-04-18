import {EventEmitter} from 'events';
import {RequestAdapter} from './adapter';
import {RequestAdapters} from './adapters';
import {RequestDetails} from './details';
import {RequestOptions} from './options';
import {RequestOptionsLog} from './options/log';

export class Request {
	public readonly events: EventEmitter;
	public readonly adapterId: string;
	public readonly adapter: RequestAdapter | null;
	public readonly adapters: RequestAdapters;
	public readonly method: string | null;
	public readonly details: RequestDetails;
	public timeStart: number;
	public timeEnd: number;
	public loaded: boolean;
	public readonly options: RequestOptions;

	constructor(events: EventEmitter, adapters: RequestAdapters, options: RequestOptions) {
		this.events = events;
		this.options = options;
		this.adapters = adapters;
		this.loaded = false;
		this.timeStart = 0;
		this.timeEnd = 0;
		this.details = new RequestDetails();

		if (!this.options.method.getUnsafe()) {
			throw new Error(`Request failed - options.method is missing or an invalid
			request method. Supported methods: GET, HEAD, POST, PUT, DELETE, OPTIONS,
			CONNECT, TRACE, PATCH.`);
		}

		this.method = options.method.get('GET');
		this.adapter = null;
		this.adapterId = this.options.adapter.id.get('http');
		this.validateAdapter(this.adapterId);
	}

	public validateAdapter(adapter: string): void {
		if (typeof adapter !== 'string') {
			throw new Error('Request init failed - options.adapter missing or not a valid string.');
		}

		if (adapter.trim() === '') {
			throw new Error('Request init failed - options.adapter cannot be an empty string.');
		}

		if (!this.adapters.isRegistered(adapter)) {
			throw new Error(`Request init failed - options.adapter '${adapter}' is not a registered adapter.`);
		}
	}

	public async load(options: RequestOptions): Promise<any> {
		if (this.loaded) {
			console.warn(
				'headless browser request.load already called - ignoring additional load calls for this request.'
			);
			return;
		}

		await this.loadAdapter(this.adapters, this.adapterId);

		this.loaded = true;
	}

	public async loadAdapter(adapters: RequestAdapters, id: string): Promise<any> {
		// todo: load adapter here.
	}

	public async execute(): Promise<Request> {
		return this;
	}
}
