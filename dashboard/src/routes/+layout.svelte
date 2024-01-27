<script lang="ts">
	import type { PageData } from './$types';
	import Header from './Header.svelte';
	import "../app.css"
	import './styles.css';
  import { QueryClientProvider } from '@sveltestack/svelte-query';

	export let data: PageData
</script>

<div class="app">
	<Header />

	<QueryClientProvider client={data.queryClient}>
		<main>
			<slot />
		</main>
	</QueryClientProvider>

	<footer>
	</footer>
</div>
