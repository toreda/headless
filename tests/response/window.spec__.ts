import {ArmorHeadlessResponseWindow} from '../../src/response/window';
import {EventEmitter} from 'events';

describe('ArmorHeadlessResponseWindow', () => {
	let instance: ArmorHeadlessResponseWindow;
	let emptyRes: any;
	let events: EventEmitter;

	beforeAll(() => {
		emptyRes = {};
		events = new EventEmitter();
		instance = new ArmorHeadlessResponseWindow(events);
		instance.load(emptyRes);
	});

	describe('Constructor', () => {
		it('should initialize instance events property to the events argument', () => {
			const events441 = new EventEmitter();
			const custom = new ArmorHeadlessResponseWindow(events441);
			expect(custom.events).toBe(events441);
		});

		it('should throw when events argument missing', () => {
			expect(() => {
				const custom = new ArmorHeadlessResponseWindow(undefined as any);
			}).toThrow('ArmorHeadlessResponseWindow init failed - events argument missing.');
		});

		it('should throw when events argument is not an EventEmitter instance', () => {
			expect(() => {
				const custom = new ArmorHeadlessResponseWindow({} as any);
			}).toThrow('ArmorHeadlessResponseWindow init failed - events argument not an EventEmitter instance.');
		});
	});

	describe('Implementation', () => {});
});
