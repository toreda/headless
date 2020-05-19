import {JSDOM, ResourceLoader, VirtualConsole} from 'jsdom';
import { NodeVM, VM } from 'vm2';

import {ArmorHeadlessElement} from '../element';
import { ArmorHeadlessRequestOptions } from '../request/options';
import { ArmorHeadlessRequestOptionsWindow } from '../request/window';
import {ArmorKeyUInt} from '@armorjs/key-store';
import {EventEmitter} from 'events';

export class ArmorHeadlessResponseWindow {
	public readonly events: EventEmitter;
	public dom: any;
	public options: ArmorHeadlessRequestOptionsWindow;
	public vm: NodeVM;
	//public resourceLoader: any;

	constructor(events: EventEmitter, options: ArmorHeadlessRequestOptionsWindow) {
		if (!events) {
			throw new Error('ArmorHeadlessResponseWindow init failed - events argument missing.');
		}

		if (!(events instanceof EventEmitter)) {
			throw new Error('ArmorHeadlessResponseWindow init failed - events argument not an EventEmitter instance.');
		}

		this.vm = new NodeVM({
			timeout: 1000,
			sandbox: {}
		});
		this.dom = null;
		this.options = options;
		this.events = events;
	}

	public createVm(): any {
		const context = {
			x: 2
		};


	}

	public element(selector: string): ArmorHeadlessElement | null {
		if (!this.dom || !this.dom.window || !this.dom.window.document) {
			return null;
		}

		let result: HTMLElement | null;

		try {
			result = this.dom.window.document.querySelector(selector);
		} catch (e) {
			result = null;
		}

		if (!result) {
			return null;
		}

		return new ArmorHeadlessElement(this.dom.window.document, result);
	}

	public title(): string | null {
		if (!this.dom) {
			return null;
		}

		const element = this.element('title');

		if (!element) {
			return null;
		}

		return element.text();
	}

	public async load(res: any): Promise<any> {
		if (!res) {
			console.warn('Request load aborted - no response provided');
			return;
		}

		let dom: any = null;

		const runScripts = this.options.executeJavascript.get(false) ? 'dangerously' : undefined;
		console.log('runScripts: ' + runScripts);
		try {
			const virtualConsole = new VirtualConsole();
			virtualConsole.on('error', (...data: any[]) => {
				console.error('VC Error: ', data);
			});

			virtualConsole.on('info', (...data: any[]) => {
				console.info('VC INFO: ', data);
			});

			virtualConsole.on('log', (...data: any[]) => {
				console.log('VC LOG: ', data);
			});

			const resourceLoader = new ResourceLoader({
				strictSSL: false,
				userAgent: "Mell/9000"
			});

			console.log('res data: ' + res.data);
			dom = await new JSDOM(res.data, {
				runScripts: runScripts,
				pretendToBeVisual: true,
				url: 'http://localhost',
				contentType: "text/html",
				virtualConsole: virtualConsole,
				resources: "usable"
			})


		} catch (e) {
			console.error(`Headless response window failed to parse dom: ${e.message}.`);
			dom = null;
		}

		this.dom = dom;
	}
}
