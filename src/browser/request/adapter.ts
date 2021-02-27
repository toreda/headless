import {Any} from 'src/aliases';
import {BrowserRequestHeaders as Headers} from './headers';

export interface BrowserRequestAdapter {
	id: string;
	get(url: string | null, headers: Headers): Promise<Any>;
	post(url: string | null, headers: Headers, payload: Any): Promise<Any>;
}
