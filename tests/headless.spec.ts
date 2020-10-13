import {EventEmitter} from 'events';
import {HBRequest} from '../src/request';
import {HBRequestOptions} from '../src/request/options';
import {HeadlessBrowser} from '../src/headless';

describe('HeadlessBrowser', () => {
	let instance: HeadlessBrowser;
	let events: EventEmitter;

	beforeAll(() => {
		events = new EventEmitter();
		instance = new HeadlessBrowser({events: events});
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw when events argument is omitted', () => {
				expect(() => {
					new HeadlessBrowser();
				}).not.toThrow();
			});

			it('should create a new event emitter when events argument is omitted', () => {
				const custom = new HeadlessBrowser();
				expect(custom.events instanceof EventEmitter).toBe(true);
			});

			it('should use options.events when given', () => {
				const custom = new HeadlessBrowser({events: events});
				expect(custom.events).toBe(events);
			});
		});
	});

	describe('Implementation', () => {
		let spy: jest.SpyInstance;
		let url = 'testurl';
		let options = {test: 'options'};

		beforeAll(() => {
			spy = jest.spyOn(instance, 'load');
		});

		afterEach(() => {
			spy.mockClear();
		});

		afterAll(() => {
			spy.mockRestore();
		});

		describe('get', () => {
			it('should call load with get', () => {
				spy.mockImplementationOnce(() => {});

				instance.get(url, {}, options as any);

				expect(spy).toBeCalledWith(url, 'GET', {}, options);
			});
		});

		describe('post', () => {
			it('should call load with post', () => {
				spy.mockImplementationOnce(() => {});

				instance.post(url, {}, options as any);

				expect(spy).toBeCalledWith(url, 'POST', {}, options);
			});
		});

		describe('load', () => {
			let spy: jest.SpyInstance;

			beforeAll(() => {
				spy = jest.spyOn(HBRequest.prototype, 'execute').mockReturnValue('execute ran' as any);
			});

			afterAll(() => {
				spy.mockRestore();
			});

			it('should create a HBrequest and execute if options is missing', () => {
				const result = instance.load(url, 'GET');
				return expect(result).resolves.toBe('execute ran');
			});

			it('should create a HBrequest and execute if options is given', () => {
				const result = instance.load(url, 'GET', {}, new HBRequestOptions());
				return expect(result).resolves.toBe('execute ran');
			});

			it('should always return HBResponse', () => {
				const result = instance.load(undefined as any, undefined as any, undefined as any, undefined as any);
				return expect(result).resolves.toBe('execute ran');
			});
		});
	});
});
