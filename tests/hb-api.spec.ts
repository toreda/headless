import {HBRequestOptions} from '../src/request/options';
import {HeadlessBrowser} from '../src/headless';

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
	let instance: HeadlessBrowser;
	let requestOptions: HBRequestOptions;

	beforeAll(() => {
		instance = new HeadlessBrowser();
		requestOptions = new HBRequestOptions();
		requestOptions.adapter.id.update('file');
	});

	it('Interact With Relative Anchor Links', () => {
		const path = 'sample-data/anchor-link.html';
		return instance
			.get(path, null, requestOptions)
			.then((rsp) => {
				const doc = rsp.win.doc;

				return rsp.followLink('#linkRel');
			})
			.then((rsp) => {
				console.log(rsp.win.title());
				expect(rsp.win.title()).toBe('hello');
			})
			.catch((err) => {
				console.error(`Error: ${err}`);
				expect(false).toBe(true);
			});
	});

	it('Interact With Absolute Anchor Links', () => {
		const path = 'sample-data/anchor-link.html';
		return instance
			.get(path, null, requestOptions)
			.then((rsp) => {
				const doc = rsp.win.doc;

				return rsp.followLink('#linkAbs');
			})
			.then((rsp) => {
				console.log(rsp.win.title());
				expect(rsp.win.title()).toBe('');
			})
			.catch((err) => {
				console.error(`Error: ${err}`);
				expect(false).toBe(true);
			});
	});

	it('Interact With GET Form', () => {
		expect.assertions(1);

		const path = 'https://www.w3schools.com/howto/tryhow_css_contact_section.htm';
		return instance
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
	});

	it('Interact With POST Form', () => {
		expect.assertions(1);

		const path = 'https://www.w3schools.com/howto/tryhow_css_login_form_modal.htm';
		return instance
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

				return rsp.submitForm('*[type=submit]');
			})
			.then((rsp) => {
				const result = rsp.getElement('h2 + div');
				expect(result!.text()).toContain('uname=CustomUserName&psw=CustomPassWord');
			})
			.catch((err) => {
				console.error(`Error: ${err}`);
				expect(err).toBe(undefined);
			});
	});
});
