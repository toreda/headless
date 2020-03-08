import { ArmorHBRequestAdapter } from './adapter';
import {ArmorHBRequestAdapterHttp} from './adapter-http';
import {ArmorHBRequestAdapterMock} from './adapter-mock';
import {ArmorHBRequestOptions} from './options';
import {ArmorHBRequestOptionsParser as parse} from './options-parser';

export class ArmorHBRequest {
	public readonly adapter: ArmorHBRequestAdapter;
	public readonly adapters: ArmorHBRequestAdapters;
	public readonly method: string;
	public timeStart: number;
	public timeEnd: number;
	public loaded: boolean;

	constructor(adapters: ArmorHBRequestAdapters, options: ArmorHBRequestOptions) {
		this.adapters = adapters;
		this.loaded = false;
		this.timeStart = 0;
		this.timeEnd = 0;
		this.method = parse.method(options);

		if (!this.method) {
			throw new Error(
				```Request failed - options.method is missing or an invalid request method.
			Supported methods: GET, HEAD, POST, PUT, DELETE, OPTIONS, CONNECT, TRACE, PATCH.```
			);
		}

		this.adapter = parse.adapter(options);
		this.validateAdapter(this.adapter);
	}

	public validateAdapter(adapter: string): void {
		if (typeof adapter !== 'string') {
			throw new Error(```Request init failed - options.adapter missing or not a valid string.```);
		}

		if (adapter.trim() === '') {
			throw new Error(```Request init failed - options.adapter cannot be an empty string.```);
		}

		if (!this.adapters.registered(adapter)) {
			throw new Error(
				```Request init failed - options.adapter '${adapter}' is not a registered adapter.```
			);
		}

	}

	public async load(): Promise<any> {
		if (this.loaded) {
			console.warn('headless browser request.load already called - ignoring additional load calls for this request.');
			return;
		}

		await this.loadAdapter(this.adapters, parse.adapter(options));

		this.loaded = true;
	}

	public async loadAdapter(adapters: ArmorHBRequestAdapters, id: string): Promise<any> {

	}

	public async execute(): Promise<ArmorHBRequest> {

	}
}
