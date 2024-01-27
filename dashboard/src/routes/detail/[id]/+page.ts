import { PUBLIC_API_HOST } from '$env/static/public';
import { api } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch, params }) => {
  const { queryClient } = await parent()

  const postId = params.id

  await queryClient.prefetchQuery({
    queryKey: ['post', postId],
    queryFn: () => api(PUBLIC_API_HOST, fetch).getPostById(postId)
  })

  return { postId };
}
