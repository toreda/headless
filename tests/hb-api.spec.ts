import {HBRequestOptions} from '../src/request/options';
import {HeadlessBrowser} from '../src/headless';

describe('Overall API Usage', () => {
	let instance: HeadlessBrowser;
	let requestOptions: HBRequestOptions;

	beforeAll(() => {
		instance = new HeadlessBrowser();
		requestOptions = new HBRequestOptions();
		requestOptions.adapter.id.update('file');
	});

	it('Interact With Anchor Links', () => {
		const path = 'sample-data/anchor-link.html';
		return instance
			.get(path, null, requestOptions)
			.then((rsp) => {
				const doc = rsp.win.doc;

				return rsp.followLink('#link');
			})
			.then((rsp) => {
				console.log(rsp.win.title());
			})
			.catch((err) => {
				console.error(`Error: ${err}`);
				expect(false).toBe(true);
			});
	});

	it('Interact With GET Form', () => {
		const path = 'https://www.w3schools.com/howto/tryhow_css_contact_section.htm';
		return instance
			.get(path)
			.then((rsp) => {
				const doc = rsp.win.doc;

				const fname = rsp.getElement('#fname');
				const lname = rsp.getElement('#lname');
				const country = rsp.getElement('#country');

				if (!fname || !lname || !country) {
					throw '';
				}

				(fname.element as HTMLInputElement).value = 'Custom';
				(lname.element as HTMLInputElement).value = 'Person';

				return rsp.submitForm('*[type=submit]');
			})
			.then((rsp) => {
				console.log(rsp.win.dom.serialize());
			})
			.catch((err) => {
				console.error(`Error: ${err}`);
				expect(err).toBe(undefined);
			});
	});

	it('Interact With POST Form', () => {
		const path = 'https://www.w3schools.com/howto/tryhow_css_login_form_modal.htm';
		return instance
			.get(path)
			.then((rsp) => {
				const doc = rsp.win.doc;

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
				console.log(rsp.win.dom.serialize());
			})
			.catch((err) => {
				console.error(`Error: ${err}`);
				expect(err).toBe(undefined);
			});
	});
});
