<script lang="ts">
	const contacts = [
		{ name: 'Protección Civil', phone: '0800-7248450', location: 'Nacional' },
		{ name: 'Bomberos de Caracas', phone: '(0212) 545-4545', location: 'Caracas' },
		{ name: 'Cruz Roja Venezolana', phone: '(0212) 578-2187', location: 'Nacional' },
		{ name: 'Emergencias Única', phone: '911', location: 'Nacional' }
	];
</script>

<div
	class="flex flex-col gap-4 p-4 bg-base-100 border border-base-200 rounded-3xl w-full lg:max-w-sm h-full overflow-y-auto"
>
	<div class="px-2">
		<h2 class="text-xl font-extrabold text-base-content tracking-tight">Contactos Rápidos</h2>
		<p class="text-xs text-base-content/50">Líneas de emergencia activas 24/7</p>
	</div>

	<ul class="menu bg-base-200 w-full rounded-box gap-2 p-2">
		{#each contacts as contact (contact.name)}
			<li>
				<a
					href="tel:{contact.phone}"
					class="flex gap-4 py-3 hover:bg-base-300 transition-colors rounded-xl"
				>
					<div class="text-base-content/60 shrink-0">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="w-5 h-5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.806-5.165-4.148-6.972-6.972l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
							/>
						</svg>
					</div>
					<div class="flex-1 flex flex-col gap-0.5">
						<div class="flex justify-between items-center w-full">
							<span class="font-bold text-sm text-base-content">{contact.name}</span>
							<span class="badge badge-sm badge-ghost text-[10px] uppercase font-semibold"
								>{contact.location}</span
							>
						</div>
						<span class="text-sm font-semibold text-base-content/80">{contact.phone}</span>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</div>
