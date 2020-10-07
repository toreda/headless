import {HBRequestOptionsHeaders} from '../../../src/request/options/headers';

describe('HBRequestOptionsHeaders', () => {
	let instance: HBRequestOptionsHeaders;

	beforeAll(() => {
		instance = new HBRequestOptionsHeaders();
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw', () => {
				expect(() => {
					new HBRequestOptionsHeaders();
				}).not.toThrow();
			});
		});
	});

	describe('Implementation', () => {
		describe('getAsObject', () => {
			it('should have all listed keys and only these keys', () => {
				const expectedV = [
					'Accept',
					'AcceptsCookies',
					'Accept-Encoding',
					'Accept-Language',
					'Cache-Control',
					'Pragma',
					'Origin',
					'Host',
					'DNT',
					'Sec-Fetch-Mode',
					'Sec-Fetch-Site',
					'User-Agent',
					'X-Requested-With',
					'X-MicrosoftAjax'
				];

				expect(Object.keys(instance.getAsObject())).toStrictEqual(expectedV);
			});
		});
	});
});
