<script lang="ts">
	import Card, { Content } from '@smui/card';
	import type { PageData } from "./$types";

	export let data: PageData
	console.log(data)
</script>
<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div>
	<h1>{data.post.title}</h1>
	<div class="card-container gap-3">
		<Card padded>
			<h3>
				title: {data.post.title}
			</h3>
			<Content>
				{data.post.body}
			</Content>
		</Card>
	</div>
</div>
