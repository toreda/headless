import {ArmorBrowserRequest} from '../../src/request/request';
import {ArmorBrowserRequestAdapterHttp} from '../../src/request/adapter/http';
import {ArmorBrowserRequestAdapterMock} from '../../src/request/adapter/mock';
import {ArmorBrowserRequestOptions} from '../../src/request/options/options';
import {ArmorBrowserResponse} from '../../src/response/response';
import {EventEmitter} from 'events';

const MOCK_URL = 'https://sample.armorjs.com';

describe('ArmorBrowserResponse', () => {
	let instance: ArmorBrowserResponse;
	let events: EventEmitter;

	beforeAll(() => {
		events = new EventEmitter();
		instance = new ArmorBrowserResponse(events, {} as any);
	});

	describe('Constructor', () => {
		it('should throw when events argument is missing', () => {
			expect(() => {
				const custom = new ArmorBrowserResponse(undefined as any, {} as any);
			}).toThrow('ArmorBrowserResponse init failed - request.events property missing.');
		});

		it('should throw when events argument is not an EventEmitter instance', () => {
			expect(() => {
				const custom = new ArmorBrowserResponse({} as any, {} as any);
			}).toThrow('ArmorBrowserResponse init failed - request.event property is not an EventEmitter instance.');
		});

		it('should throw when res argument is missing', () => {
			expect(() => {
				const custom = new ArmorBrowserResponse(events, undefined as any);
			}).toThrow('ArmorBrowserResponse init failed - res argument missing.');
		});

		it('should initialize events property from the events argument', () => {
			const events12 = new EventEmitter();
			const custom = new ArmorBrowserResponse(events12, {} as any);
			expect(custom.events).toBe(events12);
			expect(custom.events).not.toBe(events);
		});

		it('should initialize res property from the res argument', () => {
			const res = {
				'one': '14414141',
				'two': '44091091'
			} as any;
			const custom = new ArmorBrowserResponse(events, res);
			expect(custom.res).toEqual(res);
		});
	});

	describe('Implementation', () => {});
});
