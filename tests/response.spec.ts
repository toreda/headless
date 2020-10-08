import {ArmorKeyString} from '@armorjs/key-store';
import {EventEmitter} from 'events';
import {HBRequestOptions} from '../src/request/options';
import {HBResponse} from '../src/response';
import {HBResponseElement} from '../src/response/element';
import {HBResponseWindow} from '../src/response/window';

describe('HBResponse', () => {
	let instance: HBResponse;
	let events: EventEmitter;
	let emptyRes: any;
	let options: HBRequestOptions;

	beforeAll(() => {
		events = new EventEmitter();
		emptyRes = {};
		options = new HBRequestOptions();
		instance = new HBResponse(events, emptyRes, options);
		instance.load();
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should throw when events argument is missing', () => {
				expect(() => {
					new HBResponse(undefined as any, emptyRes, options);
				}).toThrow('HBResponse init failed - request.events property missing.');
			});

			it('should throw when events argument is not an EventEmitter instance', () => {
				expect(() => {
					new HBResponse({} as any, emptyRes, options);
				}).toThrow('HBResponse init failed - request.event property is not an EventEmitter instance.');
			});

			it('should initialize res property to null when missing', () => {
				const custom = new HBResponse(events, null, options);
				expect(custom.res).toBeNull();
			});

			it('should initialize events property from the events argument', () => {
				const events12 = new EventEmitter();
				const custom = new HBResponse(events12, emptyRes, options);
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
				const custom = new HBResponse(events, emptyRes, options);
				expect(custom.wnd).not.toBeUndefined();
			});
		});
	});

	describe('Implementation', () => {
		describe('createUrl', () => {
			it('should return a ArmorKeyString holding res data', () => {
				const expectedV = 'test create url stirng';
				const result = instance.createUrl({config: {url: expectedV}});
				expect(result).toBeInstanceOf(ArmorKeyString);
				expect(result.get('')).toBe(expectedV);
			});

			it('should return default ArmorKeyString if res is not the right format', () => {
				const expectedV = 'fallback';
				expect(instance.createUrl('not valid format').get(expectedV)).toBe(expectedV);
				expect(instance.createUrl({config: 'not valid format'}).get(expectedV)).toBe(expectedV);
			});
		});

		describe('load', () => {
			it('should return false if it has already been loaded', async (done) => {
				expect(instance.loaded).toBe(true);
				await instance.load().then((data) => {
					expect(data).toBe(false);
				});
				done();
			});

			it('should return window object', async (done) => {
				const custom = new HBResponse(events, emptyRes, options);
				expect(custom.loaded).toBe(false);
				await custom.load().then((data) => {
					expect(data).toBeInstanceOf(HBResponseWindow);
				});
				done();
			});
		});

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

		describe('getBody', () => {
			it('should return null if wnd does not exist', () => {
				const custom = new HBResponse(events, emptyRes, options);
				expect(custom.wnd).toBeFalsy();
				expect(custom.getBody()).toBeNull();
			});

			it('should return null if no body element exists', () => {
				expect(instance.getBody()).not.toBeNull();
				const body = instance.wnd!.element('body')!;
				const parent = body.element.parentNode!;
				parent.removeChild(body.element);
				expect(instance.getBody()).toBeNull();
				parent.appendChild(body.element);
			});

			it('should return HBResponseElement of document body', () => {
				expect(instance.getBody()).toBeInstanceOf(HBResponseElement);
			});
		});

		describe('click', () => {
			let badSelector = 'something';
			let goodSelector = '*';

			it('should return error if not finished loading', async (done) => {
				const custom = new HBResponse(events, emptyRes, options);
				expect(custom.loaded).toBe(false);

				expect.assertions(2);

				await expect(custom.click(badSelector)).rejects.toThrow(
					'headless response click failed - response has not finished loading.'
				);
				done();
			});

			it('should return error if not finished loading', async (done) => {
				const custom = new HBResponse(events, emptyRes, options);
				custom.loaded = true;
				expect(custom.wnd).toBeFalsy();

				expect.assertions(2);

				expect(custom.click(badSelector)).rejects.toThrow(
					'headless response click failed - response window not found.'
				);
				done();
			});

			it('should return error if no element is founc', async (done) => {
				expect(instance.loaded).toBe(true);
				expect(instance.wnd).toBeTruthy();

				expect.assertions(3);

				expect(instance.click(badSelector)).rejects.toThrow(
					`headless response click failed - no elements with '${badSelector}' not found in response.`
				);
				done();
			});

			it('should return true if element is clicked', async (done) => {
				expect(instance.loaded).toBe(true);
				expect(instance.wnd).toBeTruthy();

				expect.assertions(3);

				expect(instance.click(goodSelector)).resolves.toBe(true);
				done();
			});
		});
	});
});
