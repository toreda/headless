import {HBRequestOptionsLog} from '../../../src/request/options/log';

describe('HBRequestOptionsLog', () => {
	let instance: HBRequestOptionsLog;

	beforeAll(() => {
		instance = new HBRequestOptionsLog();
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw', () => {
				expect(() => {
					new HBRequestOptionsLog();
				}).not.toThrow();
			});
		});
	});
});
