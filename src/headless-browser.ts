import {ArmorHBConfig} from './config';
import {ArmorHBWindow} from './window';
import {EventEmitter} from 'events';

export class ArmorHeadlessBrowser {
	public readonly events: EventEmitter;
	public readonly config: ArmorHBConfig;

	constructor(events: EventEmitter) {
		this.events = events;
		this.config = new ArmorHBConfig();
	}

	public createWindow(): ArmorHBWindow {
		const wnd = new ArmorHBWindow();

		return wnd;
	}
}
