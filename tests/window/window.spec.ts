import {ArmorBrowserWindow} from '../../src/window/window';
import {EventEmitter} from 'events';

describe('ArmorBrowserWindow', () => {
	let instance: ArmorBrowserWindow;
	let events: EventEmitter;
	let id = 0;

	beforeAll(() => {
		events = new EventEmitter();
		instance = new ArmorBrowserWindow(events, id);
	});

	describe('Constructor', () => {
		it('should set the events property to the provided events argument', () => {
			const events1a = new EventEmitter();
			events1a['a'] = 111;
			const custom = new ArmorBrowserWindow(events1a, id);
			expect(custom.events).toBe(events1a);
		});

		it('should throw when events argument is missing', () => {
			expect(() => {
				const custom = new ArmorBrowserWindow(undefined as any, id);
			}).toThrow('ArmorBrowserWindow init failed - events argument missing.');
		});

		it('should throw when events argument is not an EventEmitter instance', () => {
			expect(() => {
				const custom = new ArmorBrowserWindow({} as any, id);
			}).toThrow(
				'ArmorBrowserWindow init failed - events argument not a valid EventEmitter instance.'
			);
		});
	});
});
