const { ApolloServer, gql } = require('apollo-server')
const { RESTDataSource } = require('apollo-datasource-rest');

class BooksAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000';
  }

  async getAllBooks() {
    const response = await this.get('/');
    return response
  }
}

const typeDefs = gql`
  type Book {
    title: String
    author: String
    pages: Int
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: (_root, _args, { dataSources }) => dataSources.booksAPI.getAllBooks(),
  },
};

const server = new ApolloServer(
  {
    cors: false,
    typeDefs,
    resolvers,
    dataSources: () => ({
      booksAPI: new BooksAPI(),
    })
  })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
})
