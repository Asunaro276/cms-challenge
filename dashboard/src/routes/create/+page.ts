import { PUBLIC_API_HOST } from '$env/static/public';
import type { PageLoad } from './$types';
import type { Post } from '/type';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch(`${PUBLIC_API_HOST}/posts`);
  const posts = (await res.json()).posts as Post[]

  return { posts };
}
