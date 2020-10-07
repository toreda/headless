import {HBRequestHeaders} from './headers';

export interface HBRequestAdapter {
	id: string;
	get(url: string | null, headers: HBRequestHeaders): Promise<any>;
	post(url: string | null, headers: HBRequestHeaders, payload: any): Promise<any>;
}
