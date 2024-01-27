import { PUBLIC_API_HOST } from '$env/static/public';
import type { PageLoad } from './$types';
import { api } from '$lib/api';

export const load: PageLoad = async ({ parent, fetch }) => {
  const { queryClient } = await parent()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: () => api(PUBLIC_API_HOST, fetch).getPosts(10)
  })
}
