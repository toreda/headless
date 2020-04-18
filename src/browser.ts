import {ArmorBrowserConfig} from './config';
import {ArmorBrowserWindow} from './window';
import {ArmorBrowserWindows} from './browser-windows';
import {EventEmitter} from 'events';

export class ArmorBrowser {
	public readonly events: EventEmitter;
	public readonly config: ArmorBrowserConfig;
	public readonly windows: ArmorBrowserWindows;

	constructor(events?: EventEmitter) {
		this.events = events ? events : new EventEmitter();
		this.config = new ArmorBrowserConfig();
		this.windows = new ArmorBrowserWindows(this.events);
	}

	public createWindows(): ArmorBrowserWindow[] {
		const windows: ArmorBrowserWindow[] = [];

		const wnd = new ArmorBrowserWindow();
		windows.push(wnd);
		return windows;
	}
}
