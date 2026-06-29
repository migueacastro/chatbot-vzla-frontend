<script>
	let { role, content } = $props();

	let isUser = $derived(role === 'user');
</script>

<div class="chat {isUser ? 'chat-end' : 'chat-start'} mb-4">
	<div class="chat-header mb-1 text-sm text-base-content/70">
		{isUser ? 'Tú' : 'Asistente'}
	</div>
	<div class="chat-bubble {isUser ? 'chat-bubble-primary text-primary-content' : 'chat-bubble-base-200 text-base-content'} text-lg shadow-sm">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html content}
	</div>
</div>
