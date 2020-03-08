import * as path from 'path';

import {ArmorHBRequestHeader} from './header';
import {DebugUtils} from '../debug-utils';
import {EBillHeaderFactory} from '../header-factory';
import axios from 'axios';

export class ArmorHBRequestAdapterHttp implements ArmorHBAdapter {
	public readonly debug: DebugUtils;
	public readonly headerFactory: EBillHeaderFactory;
	public readonly config: EBillConfig;
	public reqNum: number;

	constructor(config: EBillConfig, headerFactory: EBillHeaderFactory, debug: DebugUtils) {
		if (!config) {
			throw new Error('adapter-http init failed - no config argument provided.');
		}

		this.config = config;
		this.debug = debug;
		this.headerFactory = headerFactory;
		this.reqNum = 0;

		this.setupInterceptors();
	}

	public setupInterceptors(): void {
		if (this.config.saveRequestLogs) {
			axios.interceptors.request.use((req: any) => {
				const filename = this.getPageName(req.url);
				const method = req.method.toLowerCase();
				this.debug.writeTimestampedFile(
					'./scraped',
					`${filename}_${method}_req_content`,
					JSON.stringify(req.data)
				);
				this.debug.writeTimestampedFile(
					'./scraped',
					`${filename}_${method}_req_headers`,
					JSON.stringify(req.headers)
				);
				return req;
			});
		}
	}

	public async get(url: string | null, headers: EBillReqHeader): Promise<any> {
		headers.method = 'GET';
		const promise = new Promise((resolve, reject) => {
			if (!url) {
				console.error('Failed to build url request adapter get request.');
				return null;
			}

			axios
				.get(url, {headers})
				.then((res) => {
					console.log(`fetch success for: ${url}`);

					if (this.config.saveRequestLogs) {
						const filename = this.getPageName(url);
						this.debug.writeTimestampedFile(
							'./scraped',
							`${filename}_${headers.method}_response`,
							res.data
						);
					}

					resolve(res);
				})
				.catch((e) => {
					reject(e.message);
				});
		});

		return promise;
	}

	public getPageName(url: string): string {
		const filename = path.basename(url, '.aspx').replace('/', '');
		const withoutQuerystring = filename.split('?');
		const result = withoutQuerystring.length ? withoutQuerystring[0] : filename;
		const cleanName = `${this.reqNum}_${result.toLowerCase()}`;
		this.reqNum++;
		return cleanName;
	}

	public saveResponse(url: string, method?: string, response?: string): void {
		if (!this.config.saveRequestLogs) {
			return;
		}

		const content = response ? response : '';
		const requestMethod = method ? method : 'NA';

		const filename = this.getPageName(url);
		this.debug.writeTimestampedFile('./scraped', `${filename}_${requestMethod}_response`, content);
	}

	public async getAndClick(url: string, selector: string, headers: EBillReqHeader): Promise<any> {
		const result = {
			data: ''
		};

		const errors: string[] = [];
		headers.method = 'GET';
		const promise = new Promise(async (resolve, reject) => {
			try {
				const browser = new Zombie({
					maxWait: 10000,
					loadCSS: false
				});
				browser.headers = headers;
				browser.on('error', (err) => {
					console.log('page error: ' + err.message);
					errors.push(err.message);
				});

				const consoleLog = browser.console.log;
				browser.console.log = (...args: any[]) => {
					console.log('INJECT LOG: ', args);
					return consoleLog.apply(consoleLog, args);
				};

				const consoleWarn = browser.console.warn;
				browser.console.log = (...args: any[]) => {
					console.log('INJECT WARN: ', args);
					return consoleWarn.apply(consoleWarn, args);
				};

				/* 					browser.on('log', (level, message) => {
						console.log('LOG MESSAGE: ', message);
					}); */
				browser.visit(url, {}, async (res) => {
					this.saveResponse(url, 'HEADERS', JSON.stringify(browser.resources));
					console.log(browser.errors);
					console.log('getAndClick: ');

					browser
						.wait({duration: 5000, element: '#RadGrid1_ctl00_ctl02_ctl00_InitInsertButton'})
						.then(async () => {
							try {
								console.log('query matched');
								this.saveResponse(url, headers.method, browser.html());
								await browser.clickLink('Add new record');

								console.log('load + click done');
								console.log('redirected: ' + browser.redirected);
								console.log('browser location: ' + browser.location);
								resolve(browser.html());
							} catch (e) {
								console.error('failed to click link: ' + e.message);
								reject(e);
							}
							this.saveResponse(url, headers.method, browser.html());
						});
				});
			} catch (e) {
				console.log('err in page load: ' + e.message);

				reject(e);
			}
			/* 			const nightmare = Nightmare({
				webPreferences: {
					webSecurity: false,
					devTools: true,
					allowRunningInsecureContent: true,
					nodeIntegration: false,
					contextIsolation: false,
					sandbox: false,
					webviewTag: false,
					preload: path.resolve('dist/preload.js')
				},
				openDevTools: {
					mode: 'detach'
				},
				show: true
			});
			nightmare
				.viewport(1920, 1080)
				.goto(url, headers)
				.wait(200)
				.wait('#RadGrid1_ctl00_ctl02_ctl00_InitInsertButton')
				.screenshot('./scraped/before.png')

				.evaluate(() => {
					var ab = 1 + Math.random() * 2;
					// @ts-ignore
					console.log('document: ', document);
					const link = document.querySelector('#RadGrid1_ctl00_ctl02_ctl00_InitInsertButton') as any;
					if (link) {
						console.info('clicking radgrid insert link.');
						link.click();
					}
					// @ts-ignore
					return document.documentElement.outerHTML;
				})
				.screenshot('./scraped/after.png')
				.wait(28000)
				.end()
				.then((document: any) => {
					if (this.config.saveRequestLogs) {
						const filename = this.getPageName(url);
						this.debug.writeTimestampedFile(
							'./scraped',
							`${filename}_${headers.method}_response`,
							document
						);
					}
					result.data = document;
					resolve(result);
				})
				.catch((e) => {
					console.error(`Error during getAndClick: ${e.message}`);
					reject(e.message);
				}); */
		});

		return promise;
	}

	public async postAndClick(url: string, selector: string, headers: EBillReqHeader, payload: any): Promise<any> {
		const result = {
			data: ''
		};
		headers.method = 'POST';
		const promise = new Promise((resolve, reject) => {
			const browser = new Zombie();
			browser.headers = headers;
			browser.visit(url, () => {
				console.log('postAndClick visit: ' + url);
			});
			/* 		const nightmare = Nightmare({
				webSecurity: false,
				allowRunningInsecureContent: true
			});
			nightmare
				.goto(url, headers, payload)
				.click(selector)
				.evaluate(() => {
					// @ts-ignore
					return document.documentElement.outerHTML;
				})
				.end()
				.then((document: any) => {
					if (this.config.saveRequestLogs) {
						const filename = this.getPageName(url);
						this.debug.writeTimestampedFile('./scraped', `${filename}_post_response`, document);
					}
					result.data = document;
					resolve(result);
				})
				.catch((e) => {
					console.error(`Error during postAndRun: ${e.message}`);
					reject(e.message);
				}); */
		});

		return promise;
	}

	public async postAndRun(url: string, headers: EBillReqHeader, payload: any): Promise<any> {
		const result = {
			data: ''
		};
		headers.method = 'POST';
		const promise = new Promise((resolve, reject) => {
			const browser = new Zombie();
			browser.resources.post(
				url,
				{
					headers
				},
				(err, res) => {
					if (err) {
						console.error(`postAndRun failed: ${err.message}.`);
						return reject(err);
					}

					console.log('res: ', res);
					return resolve(res);
				}
			);

			/* 		const nightmare = Nightmare({
				webSecurity: false,
				allowRunningInsecureContent: true
			});
			nightmare
				.goto(url, headers, payload)
				.evaluate(() => {
					// @ts-ignore
					return document.documentElement.outerHTML;
				})
				.end()
				.then((document: any) => {
					if (this.config.saveRequestLogs) {
						const filename = this.getPageName(url);
						this.debug.writeTimestampedFile('./scraped', `${filename}_post_response`, document);
					}
					result.data = document;
					resolve(result);
				})
				.catch((e) => {
					console.error(`Error during postAndRun: ${e.message}`);
					reject(e.message);
				}); */
		});

		return promise;
	}

	public async post(url: string | null, headers: ArmorHBRequestHeader, payload: any): Promise<any> {
		const promise = new Promise((resolve, reject) => {
			if (!url) {
				console.error('Failed to build url for request adapter post request.');
				return null;
			}

			axios
				.post(url, payload, {headers})
				.then((res) => {
					if (this.config.saveRequestLogs) {
						const filename = this.getPageName(url);
						this.debug.writeTimestampedFile('./scraped', `${filename}_post_response`, res.data);
					}
					resolve(res);
				})
				.catch((e) => {
					reject(e.message);
				});
		});

		return promise;
	}
}
