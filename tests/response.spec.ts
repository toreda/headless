import {ArmorHeadlessRequest} from '../src/request';
import {ArmorHeadlessRequestAdapterHttp} from '../src/request/adapter/http';
import {ArmorHeadlessRequestAdapterMock} from '../src/request/adapter/mock';
import {ArmorHeadlessRequestOptions} from '../src/request/options';
import {ArmorHeadlessResponse} from '../src/response';
import {ArmorHeadlessResponseWindow} from '../src/response/window';
import {EventEmitter} from 'events';

const MOCK_URL = 'https://sample.armorjs.com';

describe('ArmorHeadlessResponse', () => {
	let instance: ArmorHeadlessResponse;
	let events: EventEmitter;
	let options: ArmorHeadlessRequestOptions;

	beforeAll(() => {
		events = new EventEmitter();
		options = new ArmorHeadlessRequestOptions();
		instance = new ArmorHeadlessResponse(events, {} as any, options);
	});

	describe('Constructor', () => {
		it('should throw when events argument is missing', () => {
			expect(() => {
				const custom = new ArmorHeadlessResponse(undefined as any, {} as any, options);
			}).toThrow('ArmorHeadlessResponse init failed - request.events property missing.');
		});

		it('should throw when events argument is not an EventEmitter instance', () => {
			expect(() => {
				const custom = new ArmorHeadlessResponse({} as any, {} as any, options);
			}).toThrow('ArmorHeadlessResponse init failed - request.event property is not an EventEmitter instance.');
		});

		it('should initialize events property from the events argument', () => {
			const events12 = new EventEmitter();
			const custom = new ArmorHeadlessResponse(events12, {} as any, options);
			expect(custom.events).toBe(events12);
			expect(custom.events).not.toBe(events);
		});

		it('should initialize res property from the res argument', () => {
			const res = {
				one: '14414141',
				two: '44091091'
			} as any;
			const custom = new ArmorHeadlessResponse(events, res, options);
			expect(custom.res).toEqual(res);
		});

		it('should initialize wnd property', () => {
			const custom = new ArmorHeadlessResponse(events, {} as any, options);
			expect(custom.wnd).not.toBeUndefined();
		});
	});

	describe('Implementation', () => {
		describe('createAndLoadWindow', () => {
			it('should return an ArmorHeadlessResponseWindow instance', async(done) => {
				const res = {};
				const wnd = await instance.createAndLoadWindow(events, res, options.window);
				expect(wnd).not.toBeNull();
				expect(wnd instanceof ArmorHeadlessResponseWindow).toBe(true);
				done();
			});

			it('should return null when window init throws', async(done) => {
				const res = {};
				const wnd = await instance.createAndLoadWindow(undefined as any, res, options.window);
				expect(wnd).toBeNull();
				done();
			});


		});
	});
});
