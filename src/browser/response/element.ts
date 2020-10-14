export class BrowserResponseElement {
	public readonly document: HTMLDocument;
	public readonly element: HTMLElement;

	constructor(document: any, element: HTMLElement) {
		if (!document) {
			throw new Error('BrowserResponseElement init failed - must provide document argument.');
		}

		if (!element) {
			throw new Error('BrowserResponseElement init failed - must provide element argument.');
		}

		this.document = document;
		this.element = element;
	}

	public child(selector: string): BrowserResponseElement | null {
		let result: HTMLElement | null;

		try {
			result = this.element.querySelector(selector);
		} catch (e) {
			result = null;
		}

		if (!result) {
			return null;
		}

		return new BrowserResponseElement(this.document, result);
	}

	public childCount(): number {
		return this.element.childElementCount;
	}

	public click(): void {
		this.element.click();
	}

	public html(): string | null {
		return this.element.innerHTML;
	}

	public text(): string | null {
		let text = this.element.textContent;

		if (!text) {
			return '';
		}

		return text.trim();
	}
}
