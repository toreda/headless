import {DebugUtils} from '../debug-utils';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

export class ArmorHBRequestAdapterMock implements ArmorHBAdapter  {
	public readonly debug: DebugUtils;
	public readonly mock: any;

	constructor() {
		this.debug = debug;
		this.headerFactory = headerFactory;
		this.mock = new MockAdapter(axios);
		this.config = config;
	}
}
