# GraphQL 
> npm init --yes && npm pkg set type="module"
> npm install @apollo/server graphql --save 

# create server 
1. Create index.js 
2. //code
   import { ApolloServer } from '@apollo/server';
   import { startStandaloneServer } from '@apollo/server/standalone';

    // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
        const server = new ApolloServer({
        typeDefs,
        resolvers,
        });

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
        const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        });

        console.log(`🚀  Server ready at: ${url}`);

# small application 

### Requirements 

//structure of the application 

 books {
    id,
    title ,
    publishedYear,
    author
 }

 author {
    id,
    name,
    books
 }

 //Data 

 1. list of the books 
 2. list of the authors
 3. list of the books with the authors details
 4. list of the authors with the books details 

