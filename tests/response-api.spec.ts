import {EventEmitter} from 'events';
import {HBElement} from '../src/element';
import {HBRequestOptions} from '../src/request/options';
import {HBRequestOptionsWindow} from '../src/request/window';
import {HBResponse} from '../src/response';
import {HBResponseWindow} from '../src/response/window';
import {HeadlessBrowser} from '../src/headless';
import Path from 'path';

describe('Response API', () => {
	let instance: HeadlessBrowser;
	let options: HBRequestOptions;

	beforeAll(() => {
		jest.setTimeout(10000);
		instance = new HeadlessBrowser();
		options = new HBRequestOptions();
		options.adapter.id.update('file');
	});

	beforeEach(() => {
		options.adapter.id.update('file');
	});

	describe('Simple Parsing', () => {
		let response: HBResponse | null = null;

		beforeAll(async (done) => {
			const path = Path.resolve('./sample-data/hello.html');
			response = await instance.get(path, options);
			done();
		});

		beforeEach(() => {});

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
					const element: HBElement | null = response!.wnd!.element('#box1552');
					expect(element).not.toBeNull();
				});

				it('should return text content of element specified by id', () => {
					const element: HBElement | null = response!.wnd!.element('#box1552');
					expect(element).not.toBeNull();
					expect(element!.text()).toBe('content_1552');
				});

				it('should return number of children', () => {
					const element: HBElement | null = response!.wnd!.element('#childcount');
					expect(element).not.toBeNull();
					expect(element!.childCount()).toBe(3);
				});
			});
		});
	});

	describe('Javascript Execution', () => {
		let response: HBResponse | null = null;

		beforeAll(async (done) => {
			options.window.executeJavascript.update(true);
			const path = Path.resolve('./sample-data/javascript.html');
			response = await instance.get(path, options);
			done();
		});

		beforeEach(() => {
			options.window.executeJavascript.update(true);
		});

		it('should execute script on page load when javascript is enabled', () => {
			const element: HBElement | null = response!.wnd!.element('#div11');
			expect(element).not.toBeNull();
		});

		describe('Javascript Compatibility (args.caller)', () => {
			beforeAll(async (done) => {
				const path = Path.resolve('./sample-data/javascript-args-caller.html');
				response = await instance.get(path, options);
				done();
			});

			it('should process code containing the obsolete arguments.caller argument', () => {
				const element: HBElement | null = response!.wnd!.element('#div-args-caller');
				expect(element).not.toBeNull();
			});
		});

		describe('Javascript Compatibility (args.callee)', () => {
			beforeAll(async (done) => {
				const path = Path.resolve('./sample-data/javascript-args-callee.html');
				response = await instance.get(path, options);
				done();
			});

			it('should process code containing the obsolete arguments.callee argument', () => {
				const element: HBElement | null = response!.wnd!.element('#div-args-callee');
				expect(element).not.toBeNull();
			});
		});

		describe('Javascript Compatibility (args.callee, strict mode)', () => {
			beforeAll(async (done) => {
				const path = Path.resolve('./sample-data/javascript-args-caller-strict.html');
				response = await instance.get(path, options);
				done();
			});

			it('should not process code containing the obsolete arguments.callee argument in strict mode', () => {
				const element: HBElement | null = response!.wnd!.element('#div-args-callee-strict');
				expect(element).toBeNull();
			});
		});

		describe('Javascript Click', () => {
			beforeAll(async (done) => {
				const path = Path.resolve('./sample-data/javascript-click.html');
				response = await instance.get(path, options);
				expect(response!.wnd!.element('#click-result')).toBeNull();
				response!.click('#click_target');
				expect(response!.wnd!.element('#click-result')).not.toBeNull();
				done();
			});
		});
	});
});
