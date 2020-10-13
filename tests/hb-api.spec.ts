import {HBRequestOptions} from '../src/request/options';
import {HeadlessBrowser} from '../src/headless';

let htmltests = false;
let loggingEnabled = false;
let logs: any[] = [];

const doLog = console.log;
console.log = (...args: any[]) => {
	if (loggingEnabled) {
		doLog(args);
	} else {
		logs.push(args);
	}
};

describe('Overall API Usage', () => {
	let requestOptions: HBRequestOptions;

	beforeAll(() => {
		requestOptions = new HBRequestOptions();
		requestOptions.adapter.id.update('file');
	});

	it('Interact With Relative Anchor Links', () => {
		const path = 'sample-data/anchor-link.html';
		return new HeadlessBrowser()
			.get(path, null, requestOptions)
			.then((rsp) => {
				return rsp.followLink('#linkRel');
			})
			.then((rsp) => {
				expect(rsp.win.title()).toBe('hello');
			})
			.catch((err) => {
				console.error(`Error: ${err}`);
				expect(false).toBe(true);
			});
	});

	if (htmltests) {
		it('Interact With Absolute Anchor Links', () => {
			const path = 'sample-data/anchor-link.html';
			return new HeadlessBrowser()
				.get(path, null, requestOptions)
				.then((rsp) => {
					return rsp.followLink('#linkAbs');
				})
				.then((rsp) => {
					expect(rsp.win.title()).toBe('GitHub - armorjs/headless');
				})
				.catch((err) => {
					console.error(`Error: ${err}`);
					expect(false).toBe(true);
				});
		}, 10000);

		it('Interact With GET Form', async () => {
			const path = 'https://www.w3schools.com/howto/tryhow_css_contact_section.htm';
			await new HeadlessBrowser()
				.get(path)
				.then((rsp) => {
					const fname = rsp.getElement('#fname');
					const lname = rsp.getElement('#lname');
					const country = rsp.getElement('#country');

					if (!fname || !lname || !country) {
						throw '';
					}

					(fname.element as HTMLInputElement).value = 'Custom';
					(lname.element as HTMLInputElement).value = 'Person';
					(country.element as HTMLSelectElement).value = 'usa';

					return rsp.submitForm('*[type=submit]');
				})
				.then((rsp) => {
					const result = rsp.getElement('h2 + div');
					expect(result!.text()).toContain('firstname=Custom&lastname=Person&country=usa');
				})
				.catch((err) => {
					console.error(`Error: ${err}`);
					expect(err).toBe(undefined);
				});
		}, 10000);

		it('Interact With POST Form', () => {
			const path = 'https://www.w3schools.com/howto/tryhow_css_login_form_modal.htm';
			return new HeadlessBrowser()
				.get(path)
				.then((rsp) => {
					rsp.click('button');
					const formIuname = rsp.getElement('input[name=uname]');
					const formIpsw = rsp.getElement('input[name=psw]');
					const formIremember = rsp.getElement('input[name=remember]');

					if (!formIuname || !formIpsw || !formIremember) {
						throw '';
					}

					(formIuname.element as HTMLInputElement).value = 'CustomUserName';
					(formIpsw.element as HTMLInputElement).value = 'CustomPassWord';
					(formIremember.element as HTMLInputElement).checked = true;

					return rsp.submitForm('*[type=submit]');
				})
				.then((rsp) => {
					const result = rsp.getElement('h2 + div');
					expect(result!.text()).toContain('uname=CustomUserName&psw=CustomPassWord&remember=on');
				})
				.catch((err) => {
					console.error(`Error: ${err}`);
					expect(err).toBe(undefined);
				});
		}, 10000);
	}
});
