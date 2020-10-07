export class HBResponseElement {
	public readonly element: HTMLElement;
	public readonly document: HTMLDocument;

	constructor(document: any, element: HTMLElement) {
		if (!document) {
			throw new Error('HBResponseElement init failed - must provide document argument.');
		}

		if (!element) {
			throw new Error('HBResponseElement init failed - must provide element argument.');
		}

		this.document = document;
		this.element = element;
	}

	public child(selector: string): HBResponseElement | null {
		let result: HTMLElement | null;

		try {
			result = this.element.querySelector(selector);
		} catch (e) {
			result = null;
		}

		if (!result) {
			return null;
		}

		return new HBResponseElement(this.document, result);
	}

	public childCount(): number {
		return this.element.childElementCount;
	}

	public click(): void {
		const evt: Event = this.document.createEvent('Event');
		evt.initEvent('click', false, true);
		this.element.dispatchEvent(evt);
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
