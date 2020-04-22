import {ArmorBrowserRequestAdapter} from './adapter';
import {ArmorBrowserRequestOptions} from '../options/options';

export class ArmorBrowserRequestAdapterMock implements ArmorBrowserRequestAdapter {
	public async get(url: string, options: ArmorBrowserRequestOptions): Promise<any> {}

	public async post(url: string, options: ArmorBrowserRequestOptions): Promise<any> {}
}
