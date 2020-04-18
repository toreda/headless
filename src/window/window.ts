import { EventEmitter } from 'events';
import {Request} from '../request';
import axios from 'axios';

export class ArmorBrowserWindow {
	public readonly events: EventEmitter;
	public readonly id: number;

	constructor(events: EventEmitter, id: number) {
		this.events = events;
		this.id = id;
	}

	public get(url: string): Promise<ArmorBrowserWindow> {
		return new Promise((resolve, reject) => {
			return resolve();
		});
	}

	public post(url: string): Promise<ArmorBrowserWindow> {
		return new Promise((resolve, reject) => {
			return resolve();
		});
	}

	public setHeaders(): ArmorBrowserWindow {
		return this;
	}

	public setCookie(): ArmorBrowserWindow {
		return this;
	}
}
