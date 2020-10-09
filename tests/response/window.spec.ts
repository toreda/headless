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
		instance = new HBResponseWindow(events, emptyRes, options);
	});

	describe('Constructor', () => {
		it('should initialize instance events property to the events argument', () => {
			const events441 = new EventEmitter();
			const custom = new HBResponseWindow(events441, emptyRes, options);
			expect(custom.events).toBe(events441);
		});

		it('should throw when events argument missing', () => {
			expect(() => {
				new HBResponseWindow(undefined as any, emptyRes, options);
			}).toThrow('HBResponseWindow init failed - events argument missing.');
		});

		it('should throw when events argument is not an EventEmitter instance', () => {
			expect(() => {
				new HBResponseWindow({} as any, emptyRes, options);
			}).toThrow('HBResponseWindow init failed - events argument not an EventEmitter instance.');
		});

		it('should throw if res is missing', () => {
			expect(() => {
				new HBResponseWindow(events, null, options);
			}).toThrow(/HBResponseWindow init failed - HBResponseWindow/);
		});
	});

	describe('Implementation', () => {
		describe('element', () => {
			it('should return null if there is no document to query', () => {
				const custom = new HBResponseWindow(events, emptyRes, options);
				delete custom.doc;
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
				const custom = new HBResponseWindow(events, emptyRes, options);
				delete custom.doc;
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
				const custom = new HBResponseWindow(events, emptyRes, options);
				delete custom.doc;
				expect(custom.title()).toBeNull();
			});

			it('should return the title of the document', () => {
				expect(instance.title()).toBe(instance.doc!.title);
			});
		});

		describe('load', () => {
			it('should return dom if loaded is true', () => {
				expect(instance.load(null)).toBeInstanceOf(JSDOM);
			});

			it('should throw if res is null', () => {
				instance.loaded = false;
				expect(() => {
					instance.load(null);
				}).toThrow('HBResponseWindow load failed - no res given.');
			});

			it('should return JSDOM object if runScripts is dangerously', () => {
				instance.options.executeJavascript.update(true);
				expect(instance.load(emptyRes)).toBeInstanceOf(JSDOM);
				instance.options.executeJavascript.update(false);
			});

			it('should return JSDOM object if runScripts is undefined', () => {
				instance.options.executeJavascript.update(false);
				expect(instance.load(emptyRes)).toBeInstanceOf(JSDOM);
			});
		});
	});
});
