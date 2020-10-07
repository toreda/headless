import {EventEmitter} from 'events';
import {HBRequestOptions} from '../src/request/options';
import {HeadlessBrowser} from '../src/headless';

describe('Headless Requests', () => {
	let instance: HeadlessBrowser;
	let events: EventEmitter;

	beforeAll(() => {
		events = new EventEmitter();
		instance = new HeadlessBrowser(events);
	});

	describe('Tests', () => {
		it('should return response when the request fails', async () => {
			const options = new HBRequestOptions();
			const response = await instance.get('https://www.google.com', options);
		});
	});
});
