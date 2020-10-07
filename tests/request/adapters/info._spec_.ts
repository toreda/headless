import {HBRequestAdapterInfo} from '../../../src/request/adapter/info';

describe('HBRequestAdapterInfo', () => {
	let instance: HBRequestAdapterInfo;

	beforeAll(() => {
		const id = 'HBRAI';
		const filePath = './';

		instance = new HBRequestAdapterInfo(id, filePath);
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw', () => {
				expect(() => {
					new HBRequestAdapterInfo('', '');
				}).not.toThrow();
			});
		});
	});

	describe('Implementation', () => {
		describe('load', () => {});
	});
});
