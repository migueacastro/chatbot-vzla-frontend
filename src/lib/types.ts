export interface Message {
	role: 'user' | 'assistant';
	content: string;
}

export interface AppConfig {
	appName: string;
	appDescription: string;
	emergencyNotice: string;
}
