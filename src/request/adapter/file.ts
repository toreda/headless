import {HBRequestAdapter} from '../adapter';
import {HBRequestHeaders} from '../headers';
import fs from 'fs';

export class HBRequestAdapterFile implements HBRequestAdapter {
	public readonly id: string;

	constructor() {
		this.id = 'file';
	}

	public getFile(path: string | null): Promise<any | null> {
		return new Promise((resolve, reject) => {
			if (typeof path !== 'string') {
				return reject(new Error('HBRequestAdapterFile failed - path is not a string.'));
			}

			let data = '';
			const stream = fs.createReadStream(path, {encoding: 'utf8'});
			stream.on('data', (chunk: any) => {
				data += chunk;
			});

			stream.on('close', () => {
				return resolve({
					data: data
				});
			});

			stream.on('error', (e) => {
				return reject(e);
			});
		});
	}

	public async get(path: string | null, headers: HBRequestHeaders): Promise<any> {
		return await this.getFile(path);
	}

	public async post(path: string | null, headers: HBRequestHeaders, payload: any): Promise<any> {
		return await this.getFile(path);
	}
}
