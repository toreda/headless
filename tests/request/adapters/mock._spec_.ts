import {HBRequestAdapterMock} from '../../../src/request/adapter/mock';

describe('HBRequestAdapterMock', () => {
	let instance: HBRequestAdapterMock;

	beforeAll(() => {
		instance = new HBRequestAdapterMock();
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw', () => {
				expect(() => {
					new HBRequestAdapterMock();
				}).not.toThrow();
			});
		});
	});

	describe('Implementation', () => {
		describe('get', () => {});

		describe('post', () => {});
	});
});
