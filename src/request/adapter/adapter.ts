export interface ArmorRequestAdapter {
	get(url: string, options?: any): Promise<any>;
}
