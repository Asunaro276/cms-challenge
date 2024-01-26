<script lang="ts">
  import Textfield from '@smui/textfield';
  import CharacterCounter from '@smui/textfield/character-counter';
	import type { PageData } from "./$types";
  import Cell from '@smui/layout-grid/src/Cell.svelte';
  import LayoutGrid from '@smui/layout-grid/src/LayoutGrid.svelte';
  import Button from '@smui/button/src/Button.svelte';
  import { createQuery } from '@tanstack/svelte-query';
	import { PUBLIC_API_HOST } from '$env/static/public';

	export let data: PageData
	let title = ''
	let body = ''

	const query = createQuery({
		queryKey: ['createPost'],
		queryFn: async () => {
			await fetch(`${PUBLIC_API_HOST}/create`)
		}
	})
</script>
<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div>
	<h1 class="text-2xl mb-4">Dashboard</h1>
	<form method="POST">
		<LayoutGrid class="gap-y-4">
			<Cell span={12}>
				<Textfield bind:value={title} label='Title' />
			</Cell>
			<Cell span={12}>
				<Textfield textarea input$maxlength={100} bind:value={body}>
				</Textfield>
			</Cell>
			<Cell>
				<Button variant='raised'>
					公開
				</Button>
			</Cell>
		</LayoutGrid>
	</form>
</div>

<style scoped>
:global(.card-media) {
	background-image: url(https://placehold.co/320x180?text=16x9);
}
</style>
