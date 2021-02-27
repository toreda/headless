import {BrowserResponseState} from 'src/browser/response/state';

describe('BrowserResponseState', () => {
	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw', () => {
				expect(() => {
					new BrowserResponseState();
				}).not.toThrow();
			});

			it('should set props using res', () => {
				const expectedV = {
					status: 1,
					statusText: 'okay'
				};

				const result = new BrowserResponseState(expectedV);

				expect(result.status()).toBe(expectedV.status);
				expect(result.statusText()).toBe(expectedV.statusText);
			});
		});
	});
});
