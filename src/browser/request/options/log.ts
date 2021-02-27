export interface BrowserRequestOptionsLog {
	enabled?: boolean;

	writeToDisk?: {
		atPath?: string;
		enabled?: boolean;
	};
}
