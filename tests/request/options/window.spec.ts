import {HBRequestOptionsWindow} from '../../../src/request/options/window';

describe('HBRequestOptionsWindow', () => {
	let instance: HBRequestOptionsWindow;

	beforeAll(() => {
		instance = new HBRequestOptionsWindow();
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw', () => {
				expect(() => {
					new HBRequestOptionsWindow();
				}).not.toThrow();
			});
		});
	});
});
