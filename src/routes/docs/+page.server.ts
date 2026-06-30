import readmeContent from '../../../README.md?raw';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return {
		readme: readmeContent
	};
};
