<script lang="ts">
	import Card, { Media } from '@smui/card';
	import LayoutGrid, { Cell } from '@smui/layout-grid'
	import type { PageData } from "./$types";
  import CreateButton from './components/CreateButton.svelte';

	export let data: PageData
</script>
<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div>
	<h1 class="text-2xl mb-4">Dashboard</h1>
	<CreateButton />	
	<LayoutGrid>
		{#each data.posts as post}
			<Cell spanDevices={{ desktop: 3, tablet: 3, phone: 4 }} class="transition hover:translate-y-1 hover:opacity-70">
				<a href={`/detail/${post.id}`}>
					<Card>
						<Media class="card-media aspect-square">
								<div style="color: #000; 16px; text-align: center;">
									<h2 class="text-xl font-bold text-[--mdc-theme--primary]">
										{post.title}
									</h2>
								</div>
						</Media>
					</Card>
				</a>
			</Cell>
		{/each}
	</LayoutGrid>
</div>

<style scoped>
:global(.card-media) {
	background-image: url(https://placehold.co/320x180?text=16x9);
}
</style>
