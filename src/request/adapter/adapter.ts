import {ArmorBrowserRequestHeaders} from '../headers';

export interface ArmorBrowserRequestAdapter {
	id: string;
	get(url: string | null, headers: ArmorBrowserRequestHeaders): Promise<any>;
	post(url: string | null, headers: ArmorBrowserRequestHeaders, payload: any): Promise<any>;
}
