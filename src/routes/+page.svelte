<script lang="ts">
	import ChatInterface from '$lib/components/Chat/ChatInterface.svelte';
	import EmergencyPanel from '$lib/components/Chat/EmergencyPanel.svelte';
	import { APP_CONFIG } from '$lib/config';

	let showWarning = $state(false); // Falso por defecto para evitar parpadeos en SSR
	let isSidebarOpen = $state(false); // Retraído por defecto en escritorio

	// Efecto para verificar cookie del aviso
	$effect(() => {
		const hasCookie = document.cookie
			.split('; ')
			.some((item) => item.trim().startsWith('hide_emergency_warning='));
		if (!hasCookie) {
			showWarning = true;
		}
	});

	function dismissWarning() {
		showWarning = false;
		// Guardar cookie por 1 año
		document.cookie = 'hide_emergency_warning=true; max-age=31536000; path=/';
	}
</script>

<svelte:head>
	<title>{APP_CONFIG.appName}</title>
</svelte:head>

<div class="w-full max-w-none px-0 md:px-8 py-0 md:py-4 flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">
	<!-- Banner de Aviso de Emergencia Oficial -->
	{#if showWarning}
		<div class="alert alert-warning py-2.5 px-4 rounded-2xl text-xs sm:text-sm font-bold flex justify-between items-center gap-2.5 mb-4 shadow-sm border border-warning/20 shrink-0 mx-4 mt-3 md:mx-0 md:mt-0">
			<div class="flex items-center gap-2.5 min-w-0">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current shrink-0 h-5 w-5 text-warning-content"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/>
				</svg>
				<span class="leading-snug truncate sm:whitespace-normal">{APP_CONFIG.emergencyNotice}</span>
			</div>
			<button
				type="button"
				class="btn btn-ghost btn-circle btn-xs text-warning-content/75 hover:bg-warning-content/10 shrink-0"
				onclick={dismissWarning}
				aria-label="Cerrar aviso de emergencia"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4.5 w-4.5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2.5"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>
	{/if}

	<!-- Layout Principal en Flex -->
	<main class="grow flex flex-col lg:flex-row gap-5 min-h-0 overflow-hidden mb-2 relative">
		<!-- Panel de Emergencia Lateral (Colapsable horizontalmente a la izquierda en escritorio) -->
		<div
			class="hidden lg:block h-full shrink-0 overflow-hidden {isSidebarOpen ? 'w-96 mr-0' : 'w-0 -mr-5'}"
		>
			<div class="w-96 h-full pr-5">
				<EmergencyPanel />
			</div>
		</div>

		<!-- Botón minimalista de tirar/retraer el panel en escritorio -->
		<div class="hidden lg:flex items-center shrink-0">
			<button
				type="button"
				class="btn btn-circle btn-sm bg-base-100 hover:bg-base-200 border border-base-300 text-base-content/70 shadow-sm transition-all duration-300 focus:outline-none"
				onclick={() => (isSidebarOpen = !isSidebarOpen)}
				aria-label={isSidebarOpen ? 'Ocultar panel de emergencias' : 'Mostrar panel de emergencias'}
			>
				{#if isSidebarOpen}
					<!-- Icono flecha izquierda (contraer) -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						stroke="currentColor"
						class="w-4 h-4"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
					</svg>
				{:else}
					<!-- Icono de teléfono/emergencia indicando que se puede abrir -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						stroke="currentColor"
						class="w-4 h-4 text-primary"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.806-5.165-4.148-6.972-6.972l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
						/>
					</svg>
				{/if}
			</button>
		</div>

		<!-- Chatbot Principal -->
		<section class="grow flex flex-col h-full min-h-[400px]">
			<ChatInterface />
		</section>
	</main>
</div>
