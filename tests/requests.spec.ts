import {ArmorHeadless} from '../src/headless';
import { ArmorHeadlessRequestOptions } from '../src/request/options/options';
import { EventEmitter } from 'events';

describe('Headless Requests', () => {
	let instance: ArmorHeadless;
	let events: EventEmitter;

	beforeAll(() => {
		events = new EventEmitter();
		instance = new ArmorHeadless(events);
	});

	describe('Tests', () => {
		it('should return response when the request fails', async() => {
			const options = new ArmorHeadlessRequestOptions();
			const response = await instance.get('https://www.google.com', options);
		});
	});
});