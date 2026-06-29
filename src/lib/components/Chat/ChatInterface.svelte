<script lang="ts">
	import MessageComponent from '$lib/components/Chat/Message.svelte';
	import SuggestedPrompts from '$lib/components/Chat/SuggestedPrompts.svelte';
	import ChatInput from '$lib/components/Chat/ChatInput.svelte';
	import { marked } from 'marked';
	import type { Message } from '$lib/types';

	let messages = $state<Message[]>([]);
	let isLoading = $state(false);
	let messageContainer = $state<HTMLDivElement | null>(null);

	// Efecto para autoscroll optimizado con requestAnimationFrame
	$effect(() => {
		if (messageContainer && (messages.length > 0 || isLoading)) {
			requestAnimationFrame(() => {
				if (messageContainer) {
					messageContainer.scrollTop = messageContainer.scrollHeight;
				}
			});
		}
	});

	async function sendMessage(text: string) {
		if (!text.trim() || isLoading) return;

		messages = [...messages, { role: 'user', content: text }];
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
			let lastParseTime = 0;

			if (reader) {
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;

					const chunk = decoder.decode(value, { stream: true });
					rawContent += chunk;

					// Optimización: Parsear markdown y actualizar el DOM como máximo cada 50ms para evitar alto consumo de CPU
					const now = performance.now();
					if (now - lastParseTime > 50) {
						messages[assistantMessageIndex] = {
							role: 'assistant',
							content: await marked.parse(rawContent)
						};
						lastParseTime = now;
					}
				}
				// Asegurar que el último fragmento se renderice siempre
				messages[assistantMessageIndex] = {
					role: 'assistant',
					content: await marked.parse(rawContent)
				};
			}
		} catch (error) {
			console.error('Error enviando mensaje:', error);
			messages = [
				...messages,
				{
					role: 'assistant',
					content: '<p class="text-error font-medium">Lo siento, ocurrió un error al intentar procesar tu mensaje. Por favor, intenta de nuevo.</p>'
				}
			];
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="flex flex-col h-full w-full bg-base-100 relative rounded-3xl overflow-hidden border border-base-200">
	<!-- Área de mensajes -->
	<div
		bind:this={messageContainer}
		class="grow p-4 md:p-6 overflow-y-auto w-full flex flex-col"
	>
		{#if messages.length === 0}
			<div class="my-auto flex flex-col items-center justify-center text-center space-y-8 py-8">
				<div class="space-y-2">
					<div class="text-3xl font-extrabold text-base-content tracking-tight">¿En qué puedo ayudarte hoy?</div>
					<p class="text-sm text-base-content/60 max-w-sm mx-auto">Selecciona una de las consultas de emergencia sugeridas o escribe tu propia pregunta abajo.</p>
				</div>
				<SuggestedPrompts onSelect={sendMessage} />
			</div>
		{:else}
			<div class="space-y-1">
				{#each messages as msg, i (i)}
					<MessageComponent role={msg.role} content={msg.content} />
				{/each}
				{#if isLoading && messages[messages.length - 1]?.role === 'user'}
					<!-- Esqueleto de carga inicial del asistente -->
					<div class="chat chat-start mb-2 animate-pulse">
						<div class="chat-image avatar placeholder">
							<div class="w-8 rounded-xl bg-base-300"></div>
						</div>
						<div class="chat-header text-xs opacity-50 mb-1">
							Asistente de Emergencia
						</div>
						<div class="chat-bubble bg-base-200 text-base-content shadow-sm flex items-center h-12">
							<span class="loading loading-dots loading-sm opacity-50"></span>
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Input de usuario -->
	<ChatInput {isLoading} onSend={sendMessage} />

	<!-- Botón de WhatsApp Flotante -->
	<a
		href="https://wa.me/584241234567"
		target="_blank"
		rel="noopener noreferrer"
		class="absolute bottom-28 right-6 btn btn-circle btn-lg bg-[#25D366] hover:bg-[#22c35e] text-white border-none shadow-lg z-10 hover:scale-105 active:scale-95 transition-transform"
		aria-label="Contactar por WhatsApp"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="w-8 h-8"
			viewBox="0 0 24 24"
			fill="none"
		>
			<path d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z" fill="currentColor"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z" fill="currentColor"/>
		</svg>
	</a>
</div>
