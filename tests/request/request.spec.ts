import {ArmorBrowserRequest} from '../../src/request/request';
import { ArmorBrowserRequestAdapterHttp } from '../../src/request/adapter/http';
import {ArmorBrowserRequestAdapterMock} from '../../src/request/adapter/mock';
import {ArmorBrowserRequestOptions} from '../../src/request/options/options';
import {EventEmitter} from 'events';

describe('ArmorBrowserRequest', () => {
	let instance: ArmorBrowserRequest;
	let events: EventEmitter;
	let options: ArmorBrowserRequestOptions;

	beforeAll(() => {
		events = new EventEmitter();
		options = new ArmorBrowserRequestOptions();
		instance = new ArmorBrowserRequest(events, options);
	});

	describe('Constructor', () => {});

	describe('Implementation', () => {
		describe('createAdapter', () => {
			it('should return a mock adapter instance when adapterId argument is mock', () => {
				const result = instance.createAdapter('mock');
				expect(result instanceof ArmorBrowserRequestAdapterMock).toBe(true);
			});

			it('should return a http adapter instance when adapterId argument is http', () => {
				const result = instance.createAdapter('http');
				expect(result instanceof ArmorBrowserRequestAdapterHttp).toBe(true);
			});

			it('should return a http adapter instance when adapterId argument is https', () => {
				const result = instance.createAdapter('https');
				expect(result instanceof ArmorBrowserRequestAdapterHttp).toBe(true);
			});

			it('should return a http adapter instance when adapterId argument is not provided', () => {
				const result = instance.createAdapter(undefined as any);
				expect(result instanceof ArmorBrowserRequestAdapterHttp).toBe(true);
			});

			it('should return a http adapter instance when adapterId argument is an empty string', () => {
				const result = instance.createAdapter('');
				expect(result instanceof ArmorBrowserRequestAdapterHttp).toBe(true);
			});

			it('should return a http adapter instance when adapterId argument is not a supported adapterId', () => {
				const result = instance.createAdapter('@@@@@@');
				expect(result instanceof ArmorBrowserRequestAdapterHttp).toBe(true);
			});
		});
	});
});
