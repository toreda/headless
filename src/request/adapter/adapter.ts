import {ArmorHeadlessRequestHeaders} from '../headers';

export interface ArmorHeadlessRequestAdapter {
	id: string;
	get(url: string | null, headers: ArmorHeadlessRequestHeaders): Promise<any>;
	post(url: string | null, headers: ArmorHeadlessRequestHeaders, payload: any): Promise<any>;
}
