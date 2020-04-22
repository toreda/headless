import {ArmorBrowserResponseWindow} from '../../src/response/window';
import {EventEmitter} from 'events';

describe('ArmorBrowserResponseWindow', () => {
	let instance: ArmorBrowserResponseWindow;
	let emptyRes: any;
	let events: EventEmitter;

	beforeAll(() => {
		emptyRes = {};
		events = new EventEmitter();
		instance = new ArmorBrowserResponseWindow(events);
		instance.load(emptyRes);
	});

	describe('Constructor', () => {
		it('should initialize instance events property to the events argument', () => {
			const events441 = new EventEmitter();
			const custom = new ArmorBrowserResponseWindow(events441);
			expect(custom.events).toBe(events441);
		});

		it('should throw when events argument missing', () => {
			expect(() => {
				const custom = new ArmorBrowserResponseWindow(undefined as any);
			}).toThrow('ArmorBrowserResponseWindow init failed - events argument missing.');
		});

		it('should throw when events argument is not an EventEmitter instance', () => {
			expect(() => {
				const custom = new ArmorBrowserResponseWindow({} as any);
			}).toThrow('ArmorBrowserResponseWindow init failed - events argument not an EventEmitter instance.');
		});
	});

	describe('Implementation', () => {});
});
