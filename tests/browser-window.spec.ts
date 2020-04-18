import {ArmorBrowserWindow} from '../src/browser-window';
import {EventEmitter} from 'events';

describe('ArmorBrowserWindow', () => {
	let instance: ArmorBrowserWindow;
	let events: EventEmitter;
	let id = 0;

	beforeAll(() => {
		events = new EventEmitter();
		instance = new ArmorBrowserWindow();
	});

	describe('Constructor', () => {
		it('should initialize the events property with an EventEmitter instance', () => {
			const custom = new ArmorBrowserWindow();
			expect(custom).toHaveProperty('events');
			expect(custom.events instanceof EventEmitter).toBe(true);
		});
	});
});
