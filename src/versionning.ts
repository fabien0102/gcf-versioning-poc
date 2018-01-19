import { FunctionEvent, fromEvent } from 'graphcool-lib'

interface Author {
  id: string
  name: string
  dateOfBirth: Date
}

interface Post {
  id: string
  title: string
  author: Author
}

export default async (event: FunctionEvent<Post>) => {
  try {
    const lib = fromEvent(event)
    const client = lib.api('simple/v1')

    // Retrieve prev state
    const { Post } = await client.request<{ Post: Post }>(
      `
      query($id: ID!) {
        Post(id: $id) {
          id
          title
          author {
            id
          }
        }
      }
      `,
      { id: event.data.id }
    )

    // Save the prev state into PostHistory
    await client.request(
      `mutation ($title: String!, $authorId: ID, $postId: ID) {
        createPostHistory(postId: $postId, title: $title, authorId: $authorId) {
          id
        }
      }      
      `,
      { postId: Post.id, title: Post.title, authorId: Post.author.id }
    )
  } catch (e) {
    console.log(e)
  }

  // Return the original data
  return { data: event.data }
}