import {ArmorHeadlessRequestAdapter} from '../adapter';
import {ArmorHeadlessRequestHeaders} from '../headers';
import {ArmorHeadlessRequestOptionsHeaders} from '../options/headers';
import fs from 'fs';

export class ArmorHeadlessRequestAdapterFile implements ArmorHeadlessRequestAdapter {
	public readonly id: string;

	constructor() {
		this.id = 'file';
	}

	public readStream(fileStream: any): Promise<any> {
		return new Promise<any>((resolve, reject) => {});
	}

	public getFile(path: string | null): Promise<any | null> {
		return new Promise((resolve, reject) => {
			if (!path) {
				console.error('Headless FileSystem adapter failed to get file content - path not a valid string.');
				return reject(
					new Error('Headless FileSystem adapter failed to get file content - path not a valid string.')
				);
			}

			let header = '';
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

	public async get(url: string | null, headers: ArmorHeadlessRequestHeaders): Promise<any> {
		return await this.getFile(url);
	}

	public async post(url: string | null, headers: ArmorHeadlessRequestHeaders, payload: any): Promise<any> {
		return await this.getFile(url);
	}
}
