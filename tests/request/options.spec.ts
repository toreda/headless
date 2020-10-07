import {HBRequestOptions} from '../../src/request/options';
import {HBRequestOptionsAdapter} from '../../src/request/options/adapter';
import {HBRequestOptionsHeaders} from '../../src/request/options/headers';
import {HBRequestOptionsLog} from '../../src/request/options/log';
import {HBRequestOptionsWindow} from '../../src/request/options/window';

describe('HBRequestOptions', () => {
	let instance: HBRequestOptions;

	beforeAll(() => {
		instance = new HBRequestOptions();
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw', () => {
				expect(() => {
					new HBRequestOptions();
				}).not.toThrow();
			});
			it('should set properties', () => {
				expect(instance.adapter).toBeInstanceOf(HBRequestOptionsAdapter);
				expect(instance.headers).toBeInstanceOf(HBRequestOptionsHeaders);
				expect(instance.log).toBeInstanceOf(HBRequestOptionsLog);
				expect(instance.window).toBeInstanceOf(HBRequestOptionsWindow);
			});
		});
	});
});
