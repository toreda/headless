export interface RequestAdapter {
	get(url: string, options?: any): Promise<any>;
}
