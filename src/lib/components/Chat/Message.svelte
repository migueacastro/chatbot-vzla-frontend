<script lang="ts">
	interface Props {
		role: 'user' | 'assistant' | 'system';
		content: string;
	}

	let { role, content }: Props = $props();

	let isUser = $derived(role === 'user');
</script>

<div class="chat {isUser ? 'chat-end' : 'chat-start'} mb-2">
	<div class="chat-image avatar placeholder">
		{#if !isUser}
			<div class="w-8 rounded-xl bg-primary text-primary-content">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2.5"
					stroke="currentColor"
					class="w-5 h-5"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 21m0 0l-.813-5.096m.813 5.1V10.5m-5.313 7.5L5 21m0 0l-.813-5.096m.813 5.1V10.5m10.626 7.5L15 21m0 0l-.813-5.096m.813 5.1V10.5M3 10.5h18M12 3v7.5" />
				</svg>
			</div>
		{:else}
			<div class="w-8 rounded-xl bg-base-300 font-bold text-xs text-base-content">
				U
			</div>
		{/if}
	</div>
	
	<div class="chat-header text-xs opacity-50 mb-1">
		{isUser ? 'Tú' : 'Asistente de Emergencia'}
	</div>
	
	<div class="chat-bubble {isUser ? 'chat-bubble-primary' : 'bg-base-200 text-base-content'} markdown-content text-base leading-relaxed select-text shadow-sm">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html content}
	</div>
</div>

<style>
	/* Estilos mínimos para el HTML renderizado de Markdown */
	:global(.markdown-content p) { margin-bottom: 0.5rem; }
	:global(.markdown-content p:last-child) { margin-bottom: 0; }
	:global(.markdown-content ul) { list-style-type: disc; padding-left: 1.25rem; margin-bottom: 0.5rem; }
	:global(.markdown-content ol) { list-style-type: decimal; padding-left: 1.25rem; margin-bottom: 0.5rem; }
	:global(.markdown-content li) { margin-bottom: 0.25rem; }
	:global(.markdown-content a) { text-decoration: underline; font-weight: 600; }
	:global(.markdown-content strong) { font-weight: 700; }
</style>
