<script lang="ts">
	import { marked } from 'marked';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	
	let htmlContent = $derived((marked.parse(data.readme) as string).replace(/src="(\.\/)?static\//g, 'src="/'));
</script>

<svelte:head>
	<title>Documentación - Widget Terremoto Venezuela</title>
</svelte:head>

<div class="container mx-auto max-w-4xl p-6 md:p-12 min-h-screen">
	<div class="prose prose-sm md:prose-base mx-auto">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html htmlContent}
	</div>
</div>
