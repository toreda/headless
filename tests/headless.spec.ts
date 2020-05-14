import {ArmorHeadless} from '../src/headless';
import {ArmorHeadlessRequest} from '../src/request';
import {ArmorHeadlessResponse} from '../src/response';
import {EventEmitter} from 'events';

describe('ArmorHeadless', () => {
	let instance: ArmorHeadless;
	let events: EventEmitter;

	beforeAll(() => {
		events = new EventEmitter();
		instance = new ArmorHeadless(events);
	});

	describe('Constructor', () => {
		it('should not throw when events argument is omitted', () => {
			expect(() => {
				const custom = new ArmorHeadless();
			}).not.toThrow();
		});

		it('should create a new event emitter when events argument is omitted', () => {
			const custom = new ArmorHeadless();
			expect(custom.events instanceof EventEmitter).toBe(true);
		});
	});

	describe('Configuration', () => {

	});
});
