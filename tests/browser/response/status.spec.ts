import {BrowserResponseStatus} from '../../../src/browser/response/status';

describe('BrowserResponseStatus', () => {
	let instance: BrowserResponseStatus;

	beforeAll(() => {
		instance = new BrowserResponseStatus({});
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw if res is null', () => {
				expect(() => {
					new BrowserResponseStatus(null);
				}).not.toThrow();
			});

			it('should set props using res', () => {
				let expectedV = {
					status: 1,
					statusText: 'okay'
				};

				let result = new BrowserResponseStatus(expectedV);

				expect(result.status.get(0)).toBe(expectedV.status);
				expect(result.statusText.get('')).toBe(expectedV.statusText);
			});
		});
	});
});
