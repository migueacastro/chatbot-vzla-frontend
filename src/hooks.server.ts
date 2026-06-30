import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Si es la ruta del widget, permitimos que cualquier origen lo embeba en un iframe
	if (event.url.pathname.startsWith('/widget')) {
		response.headers.set('X-Frame-Options', 'ALLOWALL');
		response.headers.set('Content-Security-Policy', "frame-ancestors *");
		response.headers.set('Access-Control-Allow-Origin', '*');
	} else {
		// Para el resto de la aplicación, mantenemos políticas restrictivas por defecto
		response.headers.set('X-Frame-Options', 'SAMEORIGIN');
		response.headers.set('Content-Security-Policy', "frame-ancestors 'self'");
	}

	return response;
};
