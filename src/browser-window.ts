import {ArmorRequest} from './request';
import {ArmorRequestOptions} from './request/options';
import {EventEmitter} from 'events';
import axios from 'axios';

export class ArmorBrowserWindow  {
	public readonly events: EventEmitter;

	constructor() {
		this.events = new EventEmitter();
	}

	public get(url: string, options: ArmorRequestOptions): Promise<ArmorBrowserWindow> {
		return new Promise((resolve, reject) => {
			return resolve();
		});
	}

	public post(url: string): Promise<ArmorBrowserWindow> {
		return new Promise((resolve, reject) => {
			return resolve();
		});
	}
}
