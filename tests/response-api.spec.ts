import { ArmorHeadless } from '../src/headless';
import {ArmorHeadlessRequestOptions} from '../src/request/options';
import {EventEmitter} from 'events';
import Path from 'path';

describe('Response Manipulation', () => {
	let instance: ArmorHeadless;

	beforeAll( () => {
		jest.setTimeout(10000);
		instance = new ArmorHeadless();
	});

	describe('Object', () => {
		let response;
		let options: ArmorHeadlessRequestOptions;

		beforeEach(() => {
			options = new ArmorHeadlessRequestOptions();
			options.adapter.id.update('file-system');
		});

		it('should ', async() => {
			expect.assertions(1);

			const path = Path.resolve('./sample-data/simple.html');
			const result = await instance.get(path, options);
			expect(result).not.toBeNull();
		});
	});
});
