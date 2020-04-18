import { ArmorBrowserWindow } from '../src/window/window';
import { ArmorBrowserWindows } from '../src/browser-windows';
import { EventEmitter } from 'events';

describe('ArmorBrowserWindows', () => {
	let instance: ArmorBrowserWindows;
	let events: EventEmitter;
	beforeAll(() => {
		events = new EventEmitter();
		instance = new ArmorBrowserWindows(events);
	});

	describe('Constructor', () => {
		it('should initialize windows property to an empty array', () => {
			const custom = new ArmorBrowserWindows(events);
			expect(custom).toHaveProperty('windows');
			expect(custom.windows).toEqual([]);
		});
	});

	describe('Implementation', () => {
		describe('createWindow', () => {
			it('should create one window and add it to the internal windows array', () => {
				const custom = new ArmorBrowserWindows(events);
				expect(custom.windows).toEqual([]);
				const result = custom.create();
				expect(custom.windows).toHaveLength(1);
				expect(custom.windows[0] instanceof ArmorBrowserWindow).toBe(true);
			});
		});

		describe('destroy', () => {

		});

		describe('destroyImmediate', () => {

		});
	});
});