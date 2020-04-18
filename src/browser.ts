import {ArmorBrowserConfig} from './config';
import {ArmorBrowserWindow} from './browser-window';
import {EventEmitter} from 'events';

export class ArmorBrowser {
	public readonly events: EventEmitter;
	public readonly config: ArmorBrowserConfig;

	constructor(events?: EventEmitter) {
		this.events = events ? events : new EventEmitter();
		this.config = new ArmorBrowserConfig();
	}

	public load(url: string, requestType: string): ArmorBrowserWindow {
		return new ArmorBrowserWindow();
	}

	public get(url: string): ArmorBrowserWindow {
		return new ArmorBrowserWindow();
	}

	public post(url: string): ArmorBrowserWindow {
		return new ArmorBrowserWindow();
	}
}
