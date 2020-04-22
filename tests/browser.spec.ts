import {ArmorBrowser} from '../src/browser';
import {ArmorBrowserRequest} from '../src/request/request';
import {ArmorBrowserResponse} from '../src/response/response';
import {EventEmitter} from 'events';

describe('ArmorBrowser', () => {
	let instance: ArmorBrowser;
	let events: EventEmitter;

	beforeAll(() => {
		events = new EventEmitter();
		instance = new ArmorBrowser(events);
	});

	describe('Constructor', () => {
		it('should not throw when events argument is omitted', () => {
			expect(() => {
				const custom = new ArmorBrowser();
			}).not.toThrow();
		});

		it('should create a new event emitter when events argument is omitted', () => {
			const custom = new ArmorBrowser();
			expect(custom.events instanceof EventEmitter).toBe(true);
		});
	});

	describe('Configuration', () => {

	});
});
