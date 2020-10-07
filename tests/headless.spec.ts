import {EventEmitter} from 'events';
import {HBRequest} from '../src/request';
import {HBResponse} from '../src/response';
import {HeadlessBrowser} from '../src/headless';

describe('HeadlessBrowser', () => {
	let instance: HeadlessBrowser;
	let events: EventEmitter;

	beforeAll(() => {
		events = new EventEmitter();
		instance = new HeadlessBrowser(events);
	});

	describe('Constructor', () => {
		it('should not throw when events argument is omitted', () => {
			expect(() => {
				const custom = new HeadlessBrowser();
			}).not.toThrow();
		});

		it('should create a new event emitter when events argument is omitted', () => {
			const custom = new HeadlessBrowser();
			expect(custom.events instanceof EventEmitter).toBe(true);
		});
	});

	describe('Configuration', () => {});
});
