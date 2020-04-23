import { ArmorHeadlessRequestOptionsHeaders } from '../options/headers';

export interface ArmorHeadlessRequestAdapter {
	id: string;
	get(url: string | null, headers: ArmorHeadlessRequestOptionsHeaders): Promise<any>;
	post(url: string | null, headers: ArmorHeadlessRequestOptionsHeaders, payload: any): Promise<any>;
}
