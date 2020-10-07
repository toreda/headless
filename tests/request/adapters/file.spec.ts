import {HBRequestAdapterFile} from '../../../src/request/adapter/file';

describe('HBRequestAdapterFile', () => {
	let instance: HBRequestAdapterFile;

	beforeAll(() => {
		instance = new HBRequestAdapterFile();
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw', () => {
				expect(() => {
					new HBRequestAdapterFile();
				}).not.toThrow();
			});
		});
	});

	describe('Implementation', () => {
		describe('getFile', () => {
			it('should reject if path is not a string', async () => {
				const expectedV = new Error('HBRequestAdapterFile failed - path is not a string.');
				await expect(instance.getFile(null)).rejects.toThrow(expectedV);
			});

			it('should reject and report if an error occurs', async () => {
				await expect(instance.getFile('')).rejects.toThrow();
			});

			it('should resolve and return data', async () => {
				const path = 'tests/testfile.txt';
				const expectedV = {data: 'This file has some data.'};
				await expect(instance.getFile(path)).resolves.toEqual(expectedV);
			});
		});

		describe('get', () => {
			it('should call getFile with path arg', () => {
				const spy = jest.spyOn(instance, 'getFile').mockImplementationOnce((): any => {});

				const expectedV = 'testpathnamepost';
				instance.get(expectedV, {} as any);

				expect(spy).toBeCalledWith(expectedV);
			});
		});

		describe('post', () => {
			it('should call getFile with path arg', () => {
				const spy = jest.spyOn(instance, 'getFile').mockImplementationOnce((): any => {});

				const expectedV = 'testpathnamepost';
				instance.post(expectedV, {} as any, {} as any);

				expect(spy).toBeCalledWith(expectedV);
			});
		});
	});
});
