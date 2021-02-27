import {EventEmitter} from 'events';
import {JSDOM} from 'jsdom';
import {BrowserRequestStateWindow as State} from 'src/browser/request/state/window';
import {BrowserResponseNode} from 'src/browser/response/node';
import {BrowserResponseWindow} from 'src/browser/response/window';

describe('BrowserResponseWindow', () => {
	let instance: BrowserResponseWindow;
	let emptyRes: any;
	let events: EventEmitter;
	let state: State;

	beforeAll(() => {
		emptyRes = {};
		state = new State();
		events = new EventEmitter();
		instance = new BrowserResponseWindow(events, emptyRes, state);
	});

	describe('Constructor', () => {
		it('should initialize instance events property to the events argument', () => {
			const events441 = new EventEmitter();
			const custom = new BrowserResponseWindow(events441, emptyRes, state);
			expect(custom.events).toBe(events441);
		});

		it('should throw when events argument missing', () => {
			expect(() => {
				new BrowserResponseWindow(undefined as any, emptyRes, state);
			}).toThrow('BrowserResponseWindow init failed - events argument missing.');
		});

		it('should throw when events argument is not an EventEmitter instance', () => {
			expect(() => {
				new BrowserResponseWindow({} as any, emptyRes, state);
			}).toThrow('BrowserResponseWindow init failed - events argument not an EventEmitter instance.');
		});

		it('should throw if res is missing', () => {
			expect(() => {
				new BrowserResponseWindow(events, null, state);
			}).toThrow(/BrowserResponseWindow init failed - BrowserResponseWindow/);
		});
	});

	describe('Implementation', () => {
		describe('element', () => {
			it('should return null if there is no document to query', () => {
				const custom = new BrowserResponseWindow(events, emptyRes, state);
				custom.doc = null;
				expect(custom.element('body')).toBeNull();
			});

			it('should return null if an error occurs in querySelector', () => {
				expect(instance.element('')).toBeNull();
			});

			it('should return null if no element matches selector', () => {
				expect(instance.element('#UnmatchedSelector')).toBeNull();
			});

			it('should return an BrowserResponseNode', () => {
				expect(instance.element('body')).toBeInstanceOf(BrowserResponseNode);
			});
		});

		describe('elements', () => {
			it('should return an empty array if there is no document to query', () => {
				const custom = new BrowserResponseWindow(events, emptyRes, state);
				custom.doc = null;
				expect(custom.elements('body')).toStrictEqual([]);
			});

			it('should return an empty array if an error occurs in querySelector', () => {
				expect(instance.elements('')).toStrictEqual([]);
			});

			it('should return an empty array if no element matches selector', () => {
				expect(instance.elements('#UnmatchedSelector')).toStrictEqual([]);
			});

			it('should return an BrowserResponseNode array', () => {
				const results = instance.elements('*');
				results.forEach((ele) => {
					expect(ele).toBeInstanceOf(BrowserResponseNode);
				});
			});
		});

		describe('title', () => {
			it('should return null if there is no document', () => {
				const custom = new BrowserResponseWindow(events, emptyRes, state);
				custom.doc = null;
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
				}).toThrow('BrowserResponseWindow load failed - no res given.');
			});

			it('should return JSDOM object if runScripts is dangerously', () => {
				instance.state.executeJavascript(true);
				expect(instance.load(emptyRes)).toBeInstanceOf(JSDOM);
				instance.state.executeJavascript(false);
			});

			it('should return JSDOM object if runScripts is undefined', () => {
				instance.state.executeJavascript(false);
				expect(instance.load(emptyRes)).toBeInstanceOf(JSDOM);
			});
		});
	});
});
