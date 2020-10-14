import {BrowserResponseElement} from '../../../src/browser/response/element';
import {JSDOM} from 'jsdom';

describe('BrowserResponseElement', () => {
	const DOC = new JSDOM().window.document;
	DOC.documentElement.appendChild(DOC.createElement('head'));
	DOC.documentElement.appendChild(DOC.createElement('body'));

	const ELM = DOC.createElement('div');
	DOC.body.appendChild(ELM);
	ELM.appendChild(DOC.createElement('p'));

	let instance: BrowserResponseElement;

	beforeAll(() => {
		instance = new BrowserResponseElement(DOC, ELM);
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should throw if no document is given', () => {
				const expectedV = 'BrowserResponseElement init failed - must provide document argument';
				expect(() => new BrowserResponseElement(undefined!, undefined!)).toThrow(expectedV);
			});

			it('should throw if no element is given', () => {
				const expectedV = 'BrowserResponseElement init failed - must provide element argument';
				expect(() => new BrowserResponseElement(DOC, undefined!)).toThrow(expectedV);
			});

			it('should not throw if both args are given', () => {
				expect(() => new BrowserResponseElement(DOC, ELM)).not.toThrow();
			});
		});
	});

	describe('Implementation', () => {
		describe('child', () => {
			it('should return null if an error occurs in querySelector', () => {
				expect(instance.child('')).toBeNull();
			});

			it('should return null if the selector has no matches', () => {
				expect(instance.child('#randomUnmatchedId13579')).toBeNull();
			});

			it('should return an BrowserResponseElement', () => {
				expect(instance.child('p')).toBeInstanceOf(BrowserResponseElement);
			});
		});

		describe('childCount', () => {
			it('should return the number of children', () => {
				expect(instance.childCount()).toBe(ELM.childElementCount);

				const expectedV = ELM.childElementCount + 1;
				ELM.appendChild(DOC.createElement('span'));
				expect(instance.childCount()).toBe(expectedV);
			});
		});

		describe('click', () => {
			it('should trigger a click event', () => {
				let clickCounter = 0;
				const clickListener = () => {
					clickCounter++;
				};

				instance.element.addEventListener('click', clickListener);
				expect(clickCounter).toBe(0);

				instance.click();
				expect(clickCounter).toBe(1);

				instance.click();
				expect(clickCounter).toBe(2);

				instance.element.removeEventListener('click', clickListener);
			});
		});

		describe('html', () => {
			it('should return the innerHTML', () => {
				expect(instance.html()).toBe(ELM.innerHTML);

				ELM.innerHTML = '<p></p>';
				expect(instance.html()).toBe('<p></p>');
			});
		});

		describe('text', () => {
			it.each(['', 'Some Random Text 24680'])('should return the textContent: %p', (expectedV) => {
				ELM.innerHTML = `<p>${expectedV}</p>`;
				expect(instance.text()).toBe(expectedV);

				ELM.innerHTML = `<p>  ${expectedV}  </p>`;
				expect(instance.text()).toBe(expectedV);
			});
		});
	});
});
