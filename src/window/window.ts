import {ArmorHBRequest} from '../request';
import axios from 'axios';

export class ArmorHBWindow {
	public get(url: string): Promise<ArmorHBWindow> {
		return this;
	}

	public post(url: string): Promise<ArmorHBWindow> {
		return this;
	}

	public setHeaders(): ArmorHBWindow {
		return this;
	}

	public setCookie(): ArmorHBWindow {
		return this;
	}
}
