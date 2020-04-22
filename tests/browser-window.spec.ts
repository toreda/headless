import {ArmorBrowserConfig} from '../src/config/config';
import {ArmorBrowserWindow} from '../src/browser-window';
import {EventEmitter} from 'events';

describe('ArmorBrowserWindow', () => {
	let instance: ArmorBrowserWindow;
	let events: EventEmitter;
	let config: ArmorBrowserConfig;
	let id = 0;

	beforeAll(() => {
		events = new EventEmitter();
		instance = new ArmorBrowserWindow(events, config);
	});

	describe('Constructor', () => {
		it('should initialize the events property with an EventEmitter instance', () => {
			const custom = new ArmorBrowserWindow(events, config);
			expect(custom).toHaveProperty('events');
			expect(custom.events instanceof EventEmitter).toBe(true);
		});
	});
});
