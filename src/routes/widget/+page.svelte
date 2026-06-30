<script lang="ts">
	import ChatInterface from '$lib/components/Chat/ChatInterface.svelte';
	import { APP_CONFIG } from '$lib/config';
	import { page } from '$app/state';

	// Obtener el tema (light o dark) desde los parámetros de la URL
	let theme = $derived(page.url.searchParams.get('theme') || 'light');
</script>

<svelte:head>
	<title>{APP_CONFIG.appName} - Widget</title>
</svelte:head>

<div class="w-full h-screen bg-base-100 m-0 p-0 flex flex-col overflow-hidden min-w-[260px]" data-theme={theme}>
	<!-- Navbar del Widget (Crema bg-base-200 en Claro, Marrón bg-base-300 en Oscuro) -->
	<div class="navbar min-h-12 h-12 flex justify-center items-center px-4 shrink-0 shadow-md border-b {theme === 'light' ? 'bg-base-200 text-base-content border-base-300' : 'bg-base-300 text-base-content border-base-300'}">
		<h1 class="text-xs sm:text-sm font-extrabold tracking-wide text-center truncate">
			{APP_CONFIG.appName}
		</h1>
	</div>

	<!-- Contenedor del Chat Flexible -->
	<div class="grow overflow-hidden relative flex flex-col w-full">
		<ChatInterface />
	</div>
</div>
