<script lang="ts">
	import MessageComponent from '$lib/components/Chat/Message.svelte';
	import { marked } from 'marked';
	import type { Message } from '$lib/types';

	let messages = $state<Message[]>([]);
	let inputValue = $state('');
	let isLoading = $state(false);

	const predefinidos = [
		'📞 Números de emergencia',
		'🏥 Centros de acopio',
		'⚠️ ¿Qué hacer en réplica?',
		'ℹ️ Info general del sismo'
	];

	async function sendMessage(text: string) {
		if (!text.trim() || isLoading) return;

		messages = [...messages, { role: 'user', content: text }];
		inputValue = '';
		isLoading = true;

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ messages })
			});

			if (!response.ok) throw new Error('Error en la red');
            
			const reader = response.body?.getReader();
			const decoder = new TextDecoder();
            
			messages = [...messages, { role: 'assistant', content: '' }];
			let assistantMessageIndex = messages.length - 1;
            let rawContent = '';

			if (reader) {
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					
					const chunk = decoder.decode(value, { stream: true });
                    rawContent += chunk;
					
					messages[assistantMessageIndex] = {
						role: 'assistant',
						content: await marked.parse(rawContent)
					};
				}
			}
		} catch (error) {
			console.error('Error enviando mensaje:', error);
			messages = [...messages, { role: 'assistant', content: 'Lo siento, ocurrió un error.' }];
		} finally {
			isLoading = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendMessage(inputValue);
		}
	}
</script>

<div class="flex flex-col h-full w-full bg-base-100 relative">
	<!-- Área de mensajes -->
	<div class="grow p-4 md:p-6 overflow-y-auto w-full">
		{#if messages.length === 0}
			<div class="h-full flex flex-col items-center justify-center text-center space-y-6">
				<div class="text-2xl font-semibold opacity-90">
					¿En qué te puedo ayudar?
				</div>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
					{#each predefinidos as msg (msg)}
						<button 
							class="btn btn-outline h-auto py-3 text-base text-left justify-start whitespace-normal"
							onclick={() => sendMessage(msg)}
						>
							{msg}
						</button>
					{/each}
				</div>
			</div>
		{:else}
			<div class="space-y-4">
				{#each messages as msg, i (i)}
					<MessageComponent role={msg.role} content={msg.content} />
				{/each}
				{#if isLoading}
					<div class="chat chat-start">
						<div class="chat-bubble chat-bubble-base-200">
							<span class="loading loading-dots loading-md"></span>
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Input de usuario -->
	<div class="p-3 bg-base-200 border-t border-base-300 w-full">
		<div class="flex gap-2 w-full mx-auto">
			<input 
				type="text" 
				placeholder="Escribe tu consulta..." 
				class="input input-bordered grow text-lg py-6"
				bind:value={inputValue}
				onkeydown={handleKeydown}
				disabled={isLoading}
			/>
			<button 
				class="btn btn-primary h-auto py-2 px-6 text-lg" 
				onclick={() => sendMessage(inputValue)}
				disabled={isLoading || !inputValue.trim()}
			>
				Enviar
			</button>
		</div>
	</div>
</div>
