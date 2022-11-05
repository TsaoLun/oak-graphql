import { applyGraphQL, gql, type ResolversProps, Dataloader } from "../mod.ts";
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const app = new Application();

const types = gql`
type User {
  firstName: String
  lastName: String
  "Hobbies"
  hbs: [Hobby]
}

type Hobby {
  name: String
  method: String 
}

input UserInput {
  firstName: String
  lastName: String
}

type ResolveType {
  done: Boolean
}

type Query {
  getUser(id: String): User 
}

type Mutation {
  setUser(input: UserInput!): ResolveType!
}
`;
let _loadCount = 0;
const resolvers: ResolversProps = {
  Query: {
    getUser: (parent, { id }, context, info) => {
      // console.log("id", id, await context.request?.body().value);
      return {
        firstName: "wooseok",
        lastName: "lee",
        hbs: ["football", "movie", "cakes", "games", "jobs"],
      };
    },
  },
  Mutation: {
    setUser: (parent, { input: { firstName, lastName } }, context, info) => {
      console.log("input:", firstName, lastName);
      return {
        done: true,
      };
    },
  },
  Hobby: {
    name: (parent) => {
      return parent;
    },
    method: (parent) => {
      _loadCount++;
      return dataloader.load(parent);
    },
  },
};

const _data: Record<string, string> = {
  "movie": "see",
  "football": "play",
  "cakes": "make",
  "games": "play",
  "jobs": "do",
};

const dataloader = new Dataloader<string, any>(
  async (ids: Readonly<string[]>) => {
    console.log(`Received ${ids} with count ${_loadCount}`);
    _loadCount = 0;
    return await new Promise((res, _) => {
      setTimeout(() => {
        const data = ids.map((e) => _data[e]);
        res(data);
      }, 500);
    });
  },
);

const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
  context: (ctx) => {
    // this line is for passing a user context for the auth
    return ctx;
  },
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log("Server start at http://localhost:8080/graphql");
await app.listen({ port: 8080 });
