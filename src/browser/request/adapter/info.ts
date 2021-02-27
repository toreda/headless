import {Any} from 'src/aliases';

export class BrowserRequestAdapterInfo {
	public readonly id: string;
	public readonly filePath: string;
	public loadedClass: Any;

	constructor(id: string, filePath: string) {
		this.id = id;
		this.filePath = filePath;
	}

	public async load(): Promise<Any> {
		this.loadedClass = await import(this.filePath);
	}
}
