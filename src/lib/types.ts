export interface Attachment {
	name: string;
	url: string;
	type: string;
}

export interface Message {
	role: 'user' | 'assistant';
	content: string;
	attachments?: Attachment[];
	isError?: boolean;
}

export interface AppConfig {
	appName: string;
	appDescription: string;
	emergencyNotice: string;
}
