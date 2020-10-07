import {HBRequestOptionsAdapter} from '../../../src/request/options/adapter';

describe('HBRequestOptionsAdapter', () => {
	let instance: HBRequestOptionsAdapter;

	beforeAll(() => {
		instance = new HBRequestOptionsAdapter();
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw', () => {
				expect(() => {
					new HBRequestOptionsAdapter();
				}).not.toThrow();
			});
		});
	});
});
