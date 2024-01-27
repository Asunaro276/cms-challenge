<script lang="ts">
  import Card, { Content } from "@smui/card";
  import type { PageData } from "./$types";
  import { api } from "$lib/api";
  import type { Post } from "$types";
  import { useQuery } from "@sveltestack/svelte-query";
  import { PUBLIC_API_HOST } from "$env/static/public";

  export let data: PageData;
  const queryResult = useQuery<Post, Error>({
    queryKey: ["post", data.postId],
    queryFn: () => api(PUBLIC_API_HOST).getPostById(data.postId),
  });
</script>

<svelte:head>
  <title>Dashboard</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div>
  {#if !data.postId || $queryResult.isLoading}
    <span>Loading...</span>
  {/if}
  {#if $queryResult.isError}
    <span>Error: {$queryResult.error.message}</span>
  {/if}
  {#if $queryResult.isSuccess}
  <h1>{$queryResult.data.title}</h1>
  <div class="card-container gap-3">
    <Card padded>
      <h3>
        title: {$queryResult.data.title}
      </h3>
      <Content>
        {$queryResult.data.body}
      </Content>
    </Card>
  </div>
  {/if}
</div>
