import {ArmorHeadlessRequestAdapter} from '../adapter';
import {ArmorHeadlessRequestHeaders} from '../headers';
import {ArmorHeadlessRequestOptionsHeaders} from '../options/headers';
import fs from 'fs';

export class ArmorHeadlessRequestAdapterFileSystem implements ArmorHeadlessRequestAdapter {
	public readonly id: string;

	constructor() {
		this.id = 'file-system';
	}

	public getFile(path: string | null): Promise<any | null> {
		return new Promise((resolve, reject) => {
			if (!path) {
				console.error('Headless FileSystem adapter failed to get file content - path not a valid string.');
				return reject(
					new Error('Headless FileSystem adapter failed to get file content - path not a valid string.')
				);
			}

			fs.readFile(path, 'utf8', (err: NodeJS.ErrnoException | null, data: any) => {
				if (err) {
					console.error('Failed to get file content: ' + err.message);
					return reject(err);
				}

				const res = {
					data: data
				};
				return resolve(res);
			});
		});
	}

	public async get(url: string | null, headers: ArmorHeadlessRequestHeaders): Promise<any> {
		return await this.getFile(url);
	}

	public async post(url: string | null, headers: ArmorHeadlessRequestHeaders, payload: any): Promise<any> {
		console.info('filesystem post request');
		return await this.getFile(url);
	}
}
