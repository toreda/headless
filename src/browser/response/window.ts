import {EventEmitter} from 'events';
import {JSDOM, ResourceLoader, VirtualConsole} from 'jsdom';
import {Any} from 'src/aliases';
import {BrowserRequestStateWindow as RequestStateWindow} from '../request/state/window';
import {BrowserResponseNode} from './node';

export class BrowserResponseWindow {
	public readonly events: EventEmitter;
	public loaded: boolean;
	public dom: JSDOM | null;
	public doc: Document | null;
	public state: RequestStateWindow;

	constructor(events: EventEmitter, res: Any, state: RequestStateWindow) {
		if (!events) {
			throw new Error('BrowserResponseWindow init failed - events argument missing.');
		}

		if (!(events instanceof EventEmitter)) {
			throw new Error(
				'BrowserResponseWindow init failed - events argument not an EventEmitter instance.'
			);
		}

		this.state = state;
		this.events = events;
		this.loaded = false;

		this.doc = null;
		this.dom = null;

		try {
			this.load(res);
		} catch (error) {
			throw Error(`BrowserResponseWindow init failed - ${error.message}`);
		}
	}

	public element(selector: string): BrowserResponseNode | null {
		if (!this.doc) {
			return null;
		}

		let result: HTMLElement | null;

		try {
			result = this.doc.querySelector(selector);
		} catch (e) {
			result = null;
		}

		if (!result) {
			return null;
		}

		return new BrowserResponseNode(this.doc, result);
	}

	public elements(selector: string): BrowserResponseNode[] {
		const results: BrowserResponseNode[] = [];

		if (this.doc == null) {
			return results;
		}

		const doc = this.doc;

		let matches: NodeListOf<HTMLElement>;
		try {
			matches = doc.querySelectorAll(selector);
			matches.forEach((match) => {
				const element = new BrowserResponseNode(doc, match);
				results.push(element);
			});
		} catch (e) {
			return [];
		}

		return results;
	}

	public title(): string | null {
		if (this.doc == null) {
			return null;
		}

		return this.doc.title;
	}

	public load(res: Any): JSDOM | null {
		if (this.loaded) {
			return this.dom;
		}

		if (!res) {
			throw Error('BrowserResponseWindow load failed - no res given.');
		}

		const runScripts = this.state.executeJavascript() ? 'dangerously' : undefined;

		const virtualConsole = new VirtualConsole();

		virtualConsole.on('error', (...data: Any[]) => {
			console.error(`VC ERROR: ${data}`);
		});

		virtualConsole.on('log', (...data: Any[]) => {
			console.log(`VC LOG: ${data}`);
		});

		virtualConsole.on('trace', (...data: Any[]) => {
			console.trace(`VC TRACE: ${data}`);
		});

		const resourceLoader = new ResourceLoader({
			strictSSL: false,
			userAgent: 'Mell/9000'
		});

		this.dom = new JSDOM(res.data, {
			url: 'http://localhost',
			runScripts: runScripts,
			pretendToBeVisual: true,
			contentType: 'text/html',
			virtualConsole: virtualConsole,
			resources: resourceLoader
		});
		this.doc = this.dom.window.document;
		this.loaded = true;

		return this.dom;
	}
}
