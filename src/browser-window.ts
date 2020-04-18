import {ArmorRequest} from './request';
import {ArmorRequestOptions} from './request/options';
import {EventEmitter} from 'events';
import axios from 'axios';

export class ArmorBrowserWindow {
	public readonly events: EventEmitter;
	public readonly id: number;

	constructor(events: EventEmitter, id: number) {
		if (!events) {
			throw new Error('ArmorBrowserWindow init failed - events argument missing.');
		}

		if(!(events instanceof EventEmitter)) {
			throw new Error('ArmorBrowserWindow init failed - events argument not a valid EventEmitter instance.')
		}

		this.events = events;
		this.id = id;
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
