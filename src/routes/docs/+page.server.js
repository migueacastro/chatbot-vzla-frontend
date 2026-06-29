import fs from 'fs';
import path from 'path';

export function load() {
	try {
		const readmePath = path.resolve(process.cwd(), 'README.md');
		const content = fs.readFileSync(readmePath, 'utf-8');
		return {
			readme: content
		};
	} catch (e) {
		console.error('Error cargando README:', e);
		return {
			readme: '# Error\nNo se pudo cargar el archivo README.md.'
		};
	}
}
