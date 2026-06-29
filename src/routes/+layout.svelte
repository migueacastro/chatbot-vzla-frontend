<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<!-- Solo mostramos el Navbar y Footer si NO estamos en el widget -->
{#if page.url.pathname !== '/widget'}
	<div class="flex flex-col min-h-screen">
		<Navbar />
		<div class="grow">
			{@render children()}
		</div>
	</div>
{:else}
	{@render children()}
{/if}
