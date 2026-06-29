<script>
	import ChatInterface from '$lib/components/Chat/ChatInterface.svelte';
</script>

<svelte:head>
	<title>Asistencia Terremoto Venezuela</title>
</svelte:head>

<div class="container mx-auto max-w-4xl p-4 min-h-screen flex flex-col">
	<header class="text-center my-6 md:my-10">
		<h1 class="text-4xl md:text-5xl font-bold text-primary mb-4">Chat de Asistencia</h1>
		<p class="text-xl md:text-2xl text-base-content/80">Información centralizada sobre el terremoto en Venezuela</p>
	</header>

	<main class="grow flex flex-col rounded-3xl shadow-2xl border border-base-300 overflow-hidden mb-8 bg-base-100" style="min-height: 60vh;">
		<ChatInterface />
	</main>
	
	<footer class="text-center p-4 text-base-content/60 text-lg">
		Esta herramienta es provista para centralizar información. En caso de emergencia médica, comuníquese directamente a los números locales de su zona.
	</footer>
</div>
