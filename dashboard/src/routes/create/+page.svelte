<script lang="ts">
  import Textfield from '@smui/textfield';
	import type { PageData } from "./$types";
  import Cell from '@smui/layout-grid/src/Cell.svelte';
  import LayoutGrid from '@smui/layout-grid/src/LayoutGrid.svelte';
  import Button from '@smui/button/src/Button.svelte';
	import { PUBLIC_API_HOST } from '$env/static/public';
  import type { NewPost } from '$types';
  import { api } from '$lib/api';
  import { useMutation } from '@sveltestack/svelte-query';

	let title = ''
	let body = ''

	const mutation = useMutation((newPost: NewPost) => api(PUBLIC_API_HOST).createPost(newPost))
	export async function submitHandeler(event: SubmitEvent) {
		event.preventDefault()
		$mutation.mutate({
			title,
			body
		})
	}
</script>
<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div>
	<form method="POST" on:submit={submitHandeler}>
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
