import {ArmorHeadlessRequest} from '../src/request';
import {ArmorHeadlessRequestAdapterHttp} from '../src/request/adapter/http';
import {ArmorHeadlessRequestAdapterMock} from '../src/request/adapter/mock';
import {ArmorHeadlessRequestOptions} from '../src/request/options';
import {EventEmitter} from 'events';

const MOCK_URL = 'https://sample.armorjs.com';

describe('ArmorHeadlessRequest', () => {
	let instance: ArmorHeadlessRequest;
	let events: EventEmitter;
	let options: ArmorHeadlessRequestOptions;

	beforeAll(() => {
		events = new EventEmitter();
		options = new ArmorHeadlessRequestOptions();
		instance = new ArmorHeadlessRequest(events, MOCK_URL, options);
	});

	describe('Constructor', () => {});

	describe('Implementation', () => {
		describe('createAdapter', () => {
			it('should return a mock adapter instance when adapterId argument is mock', () => {
				const result = instance.createAdapter('mock');
				expect(result instanceof ArmorHeadlessRequestAdapterMock).toBe(true);
			});

			it('should return a http adapter instance when adapterId argument is http', () => {
				const result = instance.createAdapter('http');
				expect(result instanceof ArmorHeadlessRequestAdapterHttp).toBe(true);
			});

			it('should return a http adapter instance when adapterId argument is https', () => {
				const result = instance.createAdapter('https');
				expect(result instanceof ArmorHeadlessRequestAdapterHttp).toBe(true);
			});

			it('should return a http adapter instance when adapterId argument is not provided', () => {
				const result = instance.createAdapter(undefined as any);
				expect(result instanceof ArmorHeadlessRequestAdapterHttp).toBe(true);
			});

			it('should return a http adapter instance when adapterId argument is an empty string', () => {
				const result = instance.createAdapter('');
				expect(result instanceof ArmorHeadlessRequestAdapterHttp).toBe(true);
			});

			it('should return a http adapter instance when adapterId argument is not a supported adapterId', () => {
				const result = instance.createAdapter('@@@@@@');
				expect(result instanceof ArmorHeadlessRequestAdapterHttp).toBe(true);
			});
		});
	});
});
