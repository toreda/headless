import {DebugUtils} from '../debug-utils';
import {EBillConfig} from '../config';
import {EBillHeaderFactory} from '../header-factory';
import {EBillReqAdapter} from './adapter';
import {EBillReqHeader} from './header';
import {EBillReqSession} from './session';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

export class EBillReqAdapterMock implements EBillReqAdapter {
	public readonly debug: DebugUtils;
	public readonly headerFactory: EBillHeaderFactory;
	public readonly mock: any;
	public readonly config: EBillConfig;

	constructor(config: EBillConfig, headerFactory: EBillHeaderFactory, debug: DebugUtils) {
		this.debug = debug;
		this.headerFactory = headerFactory;
		this.mock = new MockAdapter(axios);
		this.config = config;
	}

	public async getPage(url: string | null, session: EBillReqSession): Promise<any> {
		const headers = this.headerFactory.createFetch(session);
		return this.get(url, headers);
	}

	public async get(url: string | null, headers: EBillReqHeader): Promise<any> {
		const promise = new Promise((resolve, reject) => {
			resolve({
				data: ''
			});
		});

		return promise;
	}

	public async getAndClick(url: string | null, selector: string, headers: EBillReqHeader): Promise<any> {
		const promise = new Promise((resolve, reject) => {
			resolve({
				data: ''
			});
		});

		return promise;
	}

	public async post(url: string | null, headers: EBillReqHeader, payload: any): Promise<any> {
		const promise = new Promise((resolve, reject) => {
			resolve({
				data: ''
			});
		});

		return promise;
	}

	public async postAndRun(url: string | null, headers: EBillReqHeader, payload: any): Promise<any> {
		const promise = new Promise((resolve, reject) => {
			resolve({
				data: ''
			});
		});

		return promise;
	}

	public async postAndClick(
		url: string | null,
		selector: string,
		headers: EBillReqHeader,
		payload: any
	): Promise<any> {
		const promise = new Promise((resolve, reject) => {
			resolve({
				data: ''
			});
		});

		return promise;
	}
}
