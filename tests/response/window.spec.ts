import {EventEmitter} from 'events';
import {HBRequestOptionsWindow} from '../../src/request/options/window';
import {HBResponseElement} from '../../src/response/element';
import {HBResponseWindow} from '../../src/response/window';
import {JSDOM} from 'jsdom';

describe('HBResponseWindow', () => {
	let instance: HBResponseWindow;
	let emptyRes: any;
	let events: EventEmitter;
	let options: HBRequestOptionsWindow;

	beforeAll(() => {
		emptyRes = {};
		options = new HBRequestOptionsWindow();
		events = new EventEmitter();
		instance = new HBResponseWindow(events, options);
		instance.load(emptyRes);
	});

	describe('Constructor', () => {
		it('should initialize instance events property to the events argument', () => {
			const events441 = new EventEmitter();
			const custom = new HBResponseWindow(events441, options);
			expect(custom.events).toBe(events441);
		});

		it('should throw when events argument missing', () => {
			expect(() => {
				new HBResponseWindow(undefined as any, options);
			}).toThrow('HBResponseWindow init failed - events argument missing.');
		});

		it('should throw when events argument is not an EventEmitter instance', () => {
			expect(() => {
				new HBResponseWindow({} as any, options);
			}).toThrow('HBResponseWindow init failed - events argument not an EventEmitter instance.');
		});
	});

	describe('Implementation', () => {
		describe('element', () => {
			it('should return null if there is no document to query', () => {
				const custom = new HBResponseWindow(events, options);
				expect(custom.element('body')).toBeNull();
			});

			it('should return null if an error occurs in querySelector', () => {
				expect(instance.element('')).toBeNull();
			});

			it('should return null if no element matches selector', () => {
				expect(instance.element('#UnmatchedSelector')).toBeNull();
			});

			it('should return an HBResponseElement', () => {
				expect(instance.element('body')).toBeInstanceOf(HBResponseElement);
			});
		});

		describe('elements', () => {
			it('should return an empty array if there is no document to query', () => {
				const custom = new HBResponseWindow(events, options);
				expect(custom.elements('body')).toStrictEqual([]);
			});

			it('should return an empty array if an error occurs in querySelector', () => {
				expect(instance.elements('')).toStrictEqual([]);
			});

			it('should return an empty array if no element matches selector', () => {
				expect(instance.elements('#UnmatchedSelector')).toStrictEqual([]);
			});

			it('should return an HBResponseElement array', () => {
				const results = instance.elements('*');
				results.forEach((ele) => {
					expect(ele).toBeInstanceOf(HBResponseElement);
				});
			});
		});

		describe('title', () => {
			it('should return null if there is no document', () => {
				const custom = new HBResponseWindow(events, options);
				expect(custom.title()).toBeNull();
			});

			it('should return the title of the document', () => {
				expect(instance.title()).toBe(instance.doc!.title);
			});
		});

		describe('load', () => {
			it('should return undefined if res is null', () => {
				expect.assertions(1);

				return instance.load(null).then((data) => {
					expect(data).toBeNull();
				});
			});

			it('should return JSDOM object if  runScripts is dangerously', () => {
				expect.assertions(1);

				return instance.load(emptyRes).then((data) => {
					expect(data).toBeInstanceOf(JSDOM);
				});
			});

			it('should return JSDOM object if runScripts is undefined', () => {
				expect.assertions(1);

				instance.options.executeJavascript.update(true);

				return instance.load(emptyRes).then((data) => {
					instance.options.executeJavascript.update(false);
					expect(data).toBeInstanceOf(JSDOM);
				});
			});
		});
	});
});
