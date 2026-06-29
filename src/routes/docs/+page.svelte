<script>
	import { marked } from 'marked';

	let { data } = $props();
	
	let htmlContent = $derived(marked.parse(data.readme));
</script>

<svelte:head>
	<title>Documentación - Widget Terremoto Venezuela</title>
</svelte:head>

<div class="container mx-auto max-w-4xl p-6 md:p-12 min-h-screen">
	<div class="prose prose-lg md:prose-xl mx-auto">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html htmlContent}
	</div>
</div>
