import type { NewPost, Post } from "$types"

export const api = (host: string, customFetch = fetch) => ({
  getPosts: async (limit: number) => {
    const response = await customFetch(
      `${host}/posts`,
    )
    const data = (await response.json()).posts as Post[]
    return data.filter((x) => x.id <= limit)
  },
  getPostById: async (id: number): Promise<Post> => {
    const response = await customFetch(
      `${host}/posts/${id}`,
    )
    const data = (await response.json()).post as Post
    return data
  },
  createPost: async (newPost: NewPost): Promise<void> => {
    await customFetch(
      `${host}/posts/create/`,
      {
        method: 'POST',
        body: JSON.stringify(newPost),
        
      }
    )
  },
})
