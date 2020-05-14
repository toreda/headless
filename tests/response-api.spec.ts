import {ArmorHeadless} from '../src/headless';
import {ArmorHeadlessRequestOptions} from '../src/request/options';
import {ArmorHeadlessResponse} from '../src/response';
import {EventEmitter} from 'events';
import Path from 'path';

describe('Response Manipulation', () => {
	let instance: ArmorHeadless;

	beforeAll(() => {
		jest.setTimeout(10000);
		instance = new ArmorHeadless();
	});

	describe('Simple Parsing', () => {
		let response: ArmorHeadlessResponse | null = null;
		let options: ArmorHeadlessRequestOptions;

		beforeAll(async (done) => {
			options = new ArmorHeadlessRequestOptions();
			options.adapter.id.update('file-system');
			const path = Path.resolve('./sample-data/hello.html');
			response = await instance.get(path, options);
			done();
		});

		beforeEach(() => {
			options = new ArmorHeadlessRequestOptions();
			options.adapter.id.update('file-system');
		});

		it('should return headless response when target url returned data', async () => {
			expect.assertions(1);

			const path = Path.resolve('./sample-data/hello.html');
			const result = await instance.get(path, options);
			expect(result).not.toBeNull();
		});

		describe('DOM Methods', () => {
			beforeEach(() => {
				expect(response).not.toBeNull();
			});

			it('should parse document title', () => {
				const title: string|null = response!.wnd!.title();
				expect(title).not.toBeNull();
				expect(title).toBe('hello');
			});
		});
	});
});
