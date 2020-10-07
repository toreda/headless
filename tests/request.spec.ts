import {EventEmitter} from 'events';
import {HBRequest} from '../src/request';
import {HBRequestAdapterHttp} from '../src/request/adapter/http';
import {HBRequestAdapterMock} from '../src/request/adapter/mock';
import {HBRequestOptions} from '../src/request/options';

const MOCK_URL = 'https://www.w3schools.com/howto/tryhow_make_a_website_ifr.htm';

describe('HBRequest', () => {
	let instance: HBRequest;
	let events: EventEmitter;
	let options: HBRequestOptions;

	beforeAll(() => {
		events = new EventEmitter();
		options = new HBRequestOptions();
		options.adapter.id.update('mock');
		instance = new HBRequest(events, MOCK_URL, options);
	});

	describe('Constructor', () => {
		it('testing stuff', () => {
			// expect.assertions(1);
			// return instance.execute().then((data) => {
			// 	expect(data.res.data).toBe({});
			// });
		});
	});

	describe('Implementation', () => {
		describe('createAdapter', () => {
			it('should return a mock adapter instance when adapterId argument is mock', () => {
				const result = instance.createAdapter('mock');
				expect(result instanceof HBRequestAdapterMock).toBe(true);
			});

			it('should return a http adapter instance when adapterId argument is http', () => {
				const result = instance.createAdapter('http');
				expect(result instanceof HBRequestAdapterHttp).toBe(true);
			});

			it('should return a http adapter instance when adapterId argument is https', () => {
				const result = instance.createAdapter('https');
				expect(result instanceof HBRequestAdapterHttp).toBe(true);
			});

			it('should return a http adapter instance when adapterId argument is not provided', () => {
				const result = instance.createAdapter(undefined as any);
				expect(result instanceof HBRequestAdapterHttp).toBe(true);
			});

			it('should return a http adapter instance when adapterId argument is an empty string', () => {
				const result = instance.createAdapter('');
				expect(result instanceof HBRequestAdapterHttp).toBe(true);
			});

			it('should return a http adapter instance when adapterId argument is not a supported adapterId', () => {
				const result = instance.createAdapter('@@@@@@');
				expect(result instanceof HBRequestAdapterHttp).toBe(true);
			});
		});
	});
});
