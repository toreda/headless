import {HBResponseStatus} from '../../src/response/status';

describe('HBResponseStatus', () => {
	let instance: HBResponseStatus;

	beforeAll(() => {
		instance = new HBResponseStatus({});
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw if res is null', () => {
				expect(() => {
					new HBResponseStatus(null);
				}).not.toThrow();
			});

			it('should set props using res', () => {
				let expectedV = {
					status: 1,
					statusText: 'okay'
				};

				let result = new HBResponseStatus(expectedV);

				expect(result.status.get(0)).toBe(expectedV.status);
				expect(result.statusText.get('')).toBe(expectedV.statusText);
			});
		});
	});
});
