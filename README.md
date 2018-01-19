# Graphcool versioning POC

Just a little POC to add a versioning system with graphcool.

The trick is to add a `beforeOperation` hook that save the last state into a separate collection.

## Getting started

1. clone the repo
1. `gcf deploy`
1. `gcf playground`

## Classic use case

Create a user
```graphql
mutation {
  createUser( name: "fabien0102") {
    id
  }
}
```

Create a post
```graphql
mutation {
  createPost(title: "test", authorId: "cjclxr2wg006b0102d50flrwn") {
    id
    title
  }
}
```

Update a post
```graphql
mutation {
  updatePost(id: "cjclxs4vw006h0102por7sy81", title: "po po po") {
    id
    title
  }
}
```

Get the generated history
```graphql
{
  allPosts {
    id
    author {
      id
    }
    title
    history {author {id} title}
  }
  
}
```

