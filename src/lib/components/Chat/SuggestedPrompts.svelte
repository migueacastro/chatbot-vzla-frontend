<script lang="ts">
	interface Props {
		onSelect: (prompt: string) => void;
	}

	let { onSelect }: Props = $props();

	const prompts = [
		{
			title: 'Números de emergencia',
			description: 'Contactos clave de auxilio y rescate',
			text: '¿Cuáles son los números de emergencia activos?',
			icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
		},
		{
			title: 'Centros de acopio',
			description: 'Puntos de donación y asistencia',
			text: '¿Dónde están ubicados los centros de acopio autorizados?',
			icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
		},
		{
			title: '¿Qué hacer en réplica?',
			description: 'Medidas de seguridad recomendadas',
			text: '¿Qué medidas de seguridad debo tomar en caso de réplicas?',
			icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
		},
		{
			title: 'Info general del sismo',
			description: 'Detalles del evento sísmico reciente',
			text: '¿Cuál es el reporte oficial del sismo reciente en Venezuela?',
			icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
		}
	];
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl px-4 py-2">
	{#each prompts as p (p.title)}
		<button
			type="button"
			class="card card-compact bg-base-200 hover:bg-base-300 border-none transition-colors cursor-pointer text-left focus:outline-none"
			onclick={() => onSelect(p.text)}
		>
			<div class="card-body flex-row gap-3 items-center p-3">
				<div class="text-base-content/60 shrink-0">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d={p.icon} />
					</svg>
				</div>
				<div class="flex-1 min-w-0">
					<h3 class="font-bold text-base-content text-sm">{p.title}</h3>
					<p class="text-xs text-base-content/60 truncate">{p.description}</p>
				</div>
			</div>
		</button>
	{/each}
</div>
