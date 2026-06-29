<script>
	import ChatInterface from '$lib/components/Chat/ChatInterface.svelte';
	import { APP_CONFIG } from '$lib/config.js';
</script>

<svelte:head>
	<title>{APP_CONFIG.appName}</title>
</svelte:head>

<div class="container mx-auto max-w-4xl p-4 flex flex-col h-[calc(100vh-6rem)]">
	<header class="text-center my-4 md:my-6">
		<h1 class="text-4xl md:text-5xl font-bold text-base-content mb-4">{APP_CONFIG.appName}</h1>
		<p class="text-xl md:text-2xl text-base-content/80">{APP_CONFIG.appDescription}</p>
	</header>

	<main
		class="grow flex flex-col rounded-3xl shadow-2xl border border-base-300 overflow-hidden mb-8 bg-base-100"
		style="min-height: 60vh;"
	>
		<ChatInterface />
	</main>

	<footer class="text-center p-4 text-base-content/60 text-lg">
		{APP_CONFIG.emergencyNotice}
	</footer>
</div>
