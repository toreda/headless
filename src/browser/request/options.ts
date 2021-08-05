import {BrowserRequestOptionsAdapter as OptionsAdapter} from './options/adapter';
import {BrowserRequestOptionsHeaders as OptionsHeaders} from './options/headers';
import {BrowserRequestOptionsLog as OptionsLog} from './options/log';
import {BrowserRequestOptionsWindow as OptionsWindow} from './options/window';

export interface BrowserRequestOptions {
	method?: string;
	timeout?: number;

	adapter?: OptionsAdapter;
	headers?: OptionsHeaders;
	log?: OptionsLog;
	window?: OptionsWindow;
}
