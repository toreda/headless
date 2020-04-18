import {ArmorBrowserWindow} from './window/window';
import {EventEmitter} from 'events';

export class ArmorBrowserWindows {
	public readonly events: EventEmitter;
	public readonly windows: ArmorBrowserWindow[];
	public readonly windowMap: {[k: number]: ArmorBrowserWindow};
	public nextId: number;

	constructor(events: EventEmitter) {
		this.events = events;
		this.windows = [];
		this.nextId = 0;
		this.windowMap = {};
	}

	public async destroy(id: number): Promise<boolean> {
		return false;
	}

	public async destroyImmediate(id: number): Promise<boolean> {
		return false;
	}

	public create(): ArmorBrowserWindow {
		const id = this.nextId++;
		const wnd = new ArmorBrowserWindow(this.events, id);
		this.windows.push(wnd);
		this.windowMap[id] = wnd;
		return wnd;
	}
}
