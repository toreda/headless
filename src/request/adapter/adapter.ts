import { ArmorBrowserRequestOptions } from '../options/options';

export interface ArmorBrowserRequestAdapter {
	get(url: string, options: ArmorBrowserRequestOptions): Promise<any>;
	post(url: string, options: ArmorBrowserRequestOptions): Promise<any>;
}
