import {EventEmitter} from 'events';
import {HBRequestOptionsWindow} from '../../src/request/window';
import {HBResponseWindow} from '../../src/response/window';

describe('HBResponseWindow', () => {
	let instance: HBResponseWindow;
	let emptyRes: any;
	let events: EventEmitter;
	let options: HBRequestOptionsWindow;

	beforeAll(() => {
		emptyRes = {};
		options = new HBRequestOptionsWindow();
		events = new EventEmitter();
		instance = new HBResponseWindow(events);
		instance.load(emptyRes);
	});

	describe('Constructor', () => {
		it('should initialize instance events property to the events argument', () => {
			const events441 = new EventEmitter();
			const custom = new HBResponseWindow(events441);
			expect(custom.events).toBe(events441);
		});

		it('should throw when events argument missing', () => {
			expect(() => {
				const custom = new HBResponseWindow(undefined as any);
			}).toThrow('HBResponseWindow init failed - events argument missing.');
		});

		it('should throw when events argument is not an EventEmitter instance', () => {
			expect(() => {
				const custom = new HBResponseWindow({} as any);
			}).toThrow('HBResponseWindow init failed - events argument not an EventEmitter instance.');
		});
	});

	describe('Implementation', () => {});
});
