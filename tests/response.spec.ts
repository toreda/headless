import {EventEmitter} from 'events';
import {HBRequest} from '../src/request';
import {HBRequestAdapterHttp} from '../src/request/adapter/http';
import {HBRequestAdapterMock} from '../src/request/adapter/mock';
import {HBRequestOptions} from '../src/request/options';
import {HBResponse} from '../src/response';
import {HBResponseWindow} from '../src/response/window';

const MOCK_URL = 'https://sample.armorjs.com';

describe('HBResponse', () => {
	let instance: HBResponse;
	let events: EventEmitter;
	let options: HBRequestOptions;

	beforeAll(() => {
		events = new EventEmitter();
		options = new HBRequestOptions();
		instance = new HBResponse(events, {} as any, options);
	});

	describe('Constructor', () => {
		it('should throw when events argument is missing', () => {
			expect(() => {
				const custom = new HBResponse(undefined as any, {} as any, options);
			}).toThrow('HBResponse init failed - request.events property missing.');
		});

		it('should throw when events argument is not an EventEmitter instance', () => {
			expect(() => {
				const custom = new HBResponse({} as any, {} as any, options);
			}).toThrow('HBResponse init failed - request.event property is not an EventEmitter instance.');
		});

		it('should initialize events property from the events argument', () => {
			const events12 = new EventEmitter();
			const custom = new HBResponse(events12, {} as any, options);
			expect(custom.events).toBe(events12);
			expect(custom.events).not.toBe(events);
		});

		it('should initialize res property from the res argument', () => {
			const res = {
				one: '14414141',
				two: '44091091'
			} as any;
			const custom = new HBResponse(events, res, options);
			expect(custom.res).toEqual(res);
		});

		it('should initialize wnd property', () => {
			const custom = new HBResponse(events, {} as any, options);
			expect(custom.wnd).not.toBeUndefined();
		});
	});

	describe('Implementation', () => {
		describe('createAndLoadWindow', () => {
			it('should return an HBResponseWindow instance', async (done) => {
				const res = {};
				const wnd = await instance.createAndLoadWindow(events, res, options.window);
				expect(wnd).not.toBeNull();
				expect(wnd instanceof HBResponseWindow).toBe(true);
				done();
			});

			it('should return null when window init throws', async (done) => {
				const res = {};
				const wnd = await instance.createAndLoadWindow(undefined as any, res, options.window);
				expect(wnd).toBeNull();
				done();
			});
		});
	});
});
