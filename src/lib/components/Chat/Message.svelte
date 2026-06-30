<script lang="ts">
	import type { Attachment } from '$lib/types';
	import { APP_CONFIG } from '$lib/config';
	interface Props {
		role: 'user' | 'assistant' | 'system';
		content: string;
		attachments?: Attachment[];
		isError?: boolean;
		onRetry?: () => void;
	}

	let { role, content, attachments, isError, onRetry }: Props = $props();

	let isUser = $derived(role === 'user');
	let copied = $state(false);

	function copyToClipboard() {
		// Strip HTML tags to get clean text if it contains HTML
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = content;
		const textToCopy = tempDiv.textContent || tempDiv.innerText || '';

		navigator.clipboard.writeText(textToCopy).then(() => {
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		});
	}
</script>

<div class="chat {isUser ? 'chat-end' : 'chat-start'} mb-2">
	<div class="chat-image avatar placeholder">
		{#if !isUser}
			<div class="w-8 h-8 rounded-xl bg-base-200 text-base-content flex items-center justify-center shadow-sm border border-base-300/30">
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
			<div class="w-8 h-8 rounded-xl bg-base-300 font-bold text-xs text-base-content flex items-center justify-center shadow-sm border border-base-300/30">
				U
			</div>
		{/if}
	</div>
	
	<div class="chat-header text-xs opacity-50 mb-1">
		{isUser ? 'Tú' : APP_CONFIG.appName}
	</div>
	
	<div class="chat-bubble {isUser ? 'bg-base-300' : 'bg-base-200'} text-base-content markdown-content text-base leading-relaxed select-text shadow-sm flex flex-col gap-2 border border-base-300/10 relative group pr-8">
		<div>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html content}
		</div>

		{#if isError}
			<div class="flex items-center gap-2 mt-0.5">
				<span class="text-error text-xs font-bold select-none">error</span>
				{#if onRetry}
					<button
						onclick={onRetry}
						class="btn btn-xs btn-error btn-outline rounded-md px-1.5 py-0.5 h-auto min-h-0 text-[10px] uppercase font-bold tracking-wider hover:bg-error hover:text-error-content transition-all select-none"
					>
						Reintentar
					</button>
				{/if}
			</div>
		{/if}

		<!-- Botón de copiar al portapapeles -->
		<button
			onclick={copyToClipboard}
			class="absolute top-2 right-2 p-1.5 rounded-lg bg-base-100/55 hover:bg-base-100 text-base-content/70 hover:text-base-content opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200 shadow-sm border border-base-300/30"
			title="Copiar al portapapeles"
			aria-label="Copiar al portapapeles"
		>
			{#if copied}
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 text-success">
					<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
				</svg>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
				</svg>
			{/if}
		</button>
		
		{#if attachments && attachments.length > 0}
			<div class="flex flex-wrap gap-2 mt-1">
				{#each attachments as file, idx (idx)}
					{#if file.type.startsWith('image/')}
						<a href={file.url} target="_blank" rel="noopener noreferrer" class="block shrink-0">
							<img src={file.url} alt={file.name} class="max-w-[180px] max-h-[120px] rounded-lg object-cover border border-base-content/10 shadow-sm" />
						</a>
					{:else}
						<a
							href={file.url}
							download={file.name}
							class="flex items-center gap-2 p-2.5 rounded-xl text-xs max-w-[200px] truncate border border-base-content/10 bg-base-100 text-base-content hover:bg-base-300/40 transition-colors"
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
							</svg>
							<span class="truncate font-semibold">{file.name}</span>
						</a>
					{/if}
				{/each}
			</div>
		{/if}
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
