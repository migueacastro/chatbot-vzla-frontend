<script lang="ts">
	interface Props {
		isLoading: boolean;
		onSend: (text: string) => void;
	}

	let { isLoading, onSend }: Props = $props();
	let inputValue = $state('');

	function handleSend() {
		if (!inputValue.trim() || isLoading) return;
		onSend(inputValue);
		inputValue = '';
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSend();
		}
	}
</script>

<div class="p-4 bg-base-100 border-t border-base-200 w-full">
	<div class="join w-full shadow-sm rounded-3xl">
		<!-- Botón de Adjuntar -->
		<button
			type="button"
			class="btn btn-lg join-item bg-base-200 border-base-200 hover:bg-base-300 px-4 lg:px-5"
			aria-label="Adjuntar archivo o imagen"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				class="w-6 h-6 lg:w-7 lg:h-7 opacity-60"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9" />
			</svg>
		</button>

		<!-- Input de Texto Expandido -->
		<input
			type="text"
			placeholder="Haz una pregunta o consulta sobre la emergencia..."
			class="input input-lg join-item w-full bg-base-200 border-base-200 focus:outline-none placeholder:text-base-content/40 text-lg lg:text-xl"
			bind:value={inputValue}
			onkeydown={handleKeydown}
			disabled={isLoading}
		/>

		<!-- Botón de Enviar -->
		<button
			type="button"
			class="btn btn-lg join-item bg-base-200 border-base-200 hover:bg-base-300 px-4 lg:px-5 text-primary"
			onclick={handleSend}
			disabled={isLoading || !inputValue.trim()}
			aria-label="Enviar mensaje"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2.5"
				stroke="currentColor"
				class="w-6 h-6 lg:w-7 lg:h-7 transform rotate-90"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
			</svg>
		</button>
	</div>
</div>
