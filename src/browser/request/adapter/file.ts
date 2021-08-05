import fs from 'fs';
import {Any} from 'src/aliases';
import {BrowserRequestAdapter} from '../adapter';

export class BrowserRequestAdapterFile implements BrowserRequestAdapter {
	public readonly id: string;

	constructor() {
		this.id = 'file';
	}

	public getFile(path: string | null): Promise<Error | {data: string; url: string}> {
		return new Promise((resolve, reject) => {
			if (typeof path !== 'string') {
				return reject(new Error('BrowserRequestAdapterFile failed - path is not a string.'));
			}

			let data = '';
			const stream = fs.createReadStream(path, {encoding: 'utf8'});
			stream.on('data', (chunk) => {
				data += chunk;
			});

			stream.on('close', () => {
				return resolve({
					data: data,
					url: path
				});
			});

			stream.on('error', (e) => {
				return reject(e);
			});
		});
	}

	public async get(path: string | null): Promise<Any> {
		return await this.getFile(path);
	}

	public async post(path: string | null): Promise<Any> {
		return await this.getFile(path);
	}
}
