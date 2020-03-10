export interface AdapterBase {
	get(url: string, options?: any): Promise<any>;
}
