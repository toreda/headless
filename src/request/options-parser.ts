import {ArmorHBRequestMethods} from './methods';
import {ArmorHBRequestOptions} from './options';

export class ArmorHBRequestOptionsParser {
	public static method(options?: ArmorHBRequestOptions): string|null {
		if (!options) {
			return null;
		}

		if (typeof options.method !== 'string') {
			return null;
		}

		const upperMethod = options.method.toUpperCase();

		if (!ArmorHBRequestMethods.has(upperMethod)) {
			console.error(`Unsupported request method '${upperMethod}'.`);
			return null;
		}
	}

	public static adapter(options?: ArmorHBRequestOptions): string {
		if (!options) {
			return 'http';
		}

		if (typeof options.adapter !== 'string') {
			return 'http';
		}

		return options.adapter.toLowerCase();
	}
}
