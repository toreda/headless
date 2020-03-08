import {ArmorHBRequestOptionsHeaders} from './options-headers';

export interface ArmorHBRequestOptions {
	url: string;
	headers?: ArmorHBRequestOptionsHeaders;
	method?: string;
	adapter?: {
		id?: string;
		httpFallbackEnabled?: boolean;
	};
}
