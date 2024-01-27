<script lang="ts">
	import Textfield from '@smui/textfield';
  import Card, { Content } from "@smui/card";
  import type { PageData } from "./$types";
  import { api } from "$lib/api";
  import type { Post } from "$types";
  import { useMutation, useQuery } from "@sveltestack/svelte-query";
  import { PUBLIC_API_HOST } from "$env/static/public";
  import Button from '@smui/button';

  export let data: PageData;
  const queryResult = useQuery<Post, Error>({
    queryKey: ["post", data.postId],
    queryFn: () => api(PUBLIC_API_HOST).getPostById(data.postId),
  });
  let title = $queryResult.data?.title
  let body = $queryResult.data?.body

  const editMutation = useMutation((post: Post) => api(PUBLIC_API_HOST).editPost(post))
  export async function editHandler(event: SubmitEvent) {
    event.preventDefault()
    $editMutation.mutate({
      id: data.postId,
      title: String(title),
      body: String(body),
    })
  }

  const deleteMutation = useMutation((id: string) => api(PUBLIC_API_HOST).deletePost(id))
  export function deleteHandler(event: CustomEvent) {
    event.preventDefault()
    $deleteMutation.mutate(data.postId)
    $queryResult.refetch()
  }
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
  <form class="card-container gap-3" method="PUT" on:submit={editHandler}>
    <Card padded>
      <Content>
        <Textfield bind:value={title} label='title' />
      </Content>
      <Content>
        <Textfield bind:value={body} label='body' />
      </Content>
    </Card>
    <Button href='/' variant='raised'>
      保存
    </Button>
  </form>
  <Button href='/' variant='raised' color='secondary' on:click={deleteHandler}>
    削除
  </Button>
  {/if}
</div>
