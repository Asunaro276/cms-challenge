import { PUBLIC_API_HOST } from '$env/static/public';
import type { PageLoad } from './$types';
import type { Post } from '/type';

export const load: PageLoad = async ({ fetch, params }) => {

  const res = await fetch(`${PUBLIC_API_HOST}/posts/${params.id}`);
  const post = (await res.json()).post as Post

  return { post };
}
