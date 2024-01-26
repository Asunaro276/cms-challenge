import { PUBLIC_API_HOST } from '$env/static/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch(`${PUBLIC_API_HOST}/posts`);
  const item = await res.json();

  return { item };
}
