import {ArmorHeadless} from '../src/headless';
import { ArmorHeadlessElement } from '../src/element';
import {ArmorHeadlessRequestOptions} from '../src/request/options';
import {ArmorHeadlessResponse} from '../src/response';
import {ArmorHeadlessResponseWindow} from '../src/response/window';
import {EventEmitter} from 'events';
import Path from 'path';

describe('Response Window', () => {
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
				const title: string | null = response!.wnd!.title();
				expect(title).not.toBeNull();
				expect(title).toBe('hello');
			});

			describe('element', () => {
				it('should get element specified by id', () => {
					const element: ArmorHeadlessElement | null = response!.wnd!.element('#box1552');
					expect(element).not.toBeNull();
				});

				it('should return text content of element specified by id', () => {
					const element: ArmorHeadlessElement | null = response!.wnd!.element('#box1552');
					expect(element).not.toBeNull();
					expect(element!.text()).toBe('content_1552');
				});

				it('should return number of children', () => {
					const element: ArmorHeadlessElement | null = response!.wnd!.element('#childcount');
					expect(element).not.toBeNull();
					expect(element!.childCount()).toBe(3);
				});
			});
		});
	});

	describe('Javascript Execution', () => {
		let response: ArmorHeadlessResponse | null = null;
		let options: ArmorHeadlessRequestOptions;

		beforeAll(async (done) => {
			options = new ArmorHeadlessRequestOptions();
			options.adapter.id.update('file-system');
			options.executeJavascript.update(true);
			const path = Path.resolve('./sample-data/javascript.html');
			response = await instance.get(path, options);
			done();
		});

		beforeEach(() => {
			options = new ArmorHeadlessRequestOptions();
			options.executeJavascript.update(true);
			options.adapter.id.update('file-system');
		});

		describe('Enabled', () => {
			it('should execute javascript on page load', () => {
				const element: ArmorHeadlessElement | null = response!.wnd!.element('#div11');
				expect(element).not.toBeNull();
			});
		});

	});
});
