<script lang="ts">
  import Card, { Media } from "@smui/card";
  import CircularProgress from "@smui/circular-progress";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import { PUBLIC_API_HOST } from "$env/static/public";
  import CreateButton from "./components/CreateButton.svelte";
  import { useQuery } from "@sveltestack/svelte-query";
  import { api } from "$lib/api";
  import type { Post } from "$types";

  let limit = 10;

  const queryResult = useQuery<Post[], Error>({
    queryKey: ["posts", limit],
    queryFn: () => api(PUBLIC_API_HOST).getPosts(limit),
  });
</script>

<svelte:head>
  <title>Dashboard</title>
  <meta name="description" content="About this app" />
</svelte:head>

{#if $queryResult.isLoading}
  <div class="w-full h-96 flex justify-center items-center opacity-20">
    <CircularProgress style="height: 100px; width: 100px;" indeterminate />
  </div>
{:else if $queryResult.isError}
  <span>Error: {$queryResult.error.message}</span>
{:else if $queryResult.data}
  <h1 class="text-2xl mb-4">Dashboard</h1>
  <CreateButton />
  <ul>
    <LayoutGrid>
      {#each $queryResult.data as post}
        <Cell
          spanDevices={{ desktop: 3, tablet: 3, phone: 4 }}
          class="transition hover:translate-y-1 hover:opacity-70"
        >
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
  </ul>
  {#if $queryResult.isFetching}
    <div style="color:darkgreen; font-weight:700">Background Updating...</div>
  {/if}
{/if}

<style scoped>
  :global(.card-media) {
    background-image: url(https://placehold.co/320x180?text=16x9);
  }
</style>
