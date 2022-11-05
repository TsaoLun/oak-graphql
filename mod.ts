import { GraphQLError, gql, PubSub, Dataloader } from "./deps.ts";

export { gql, PubSub, Dataloader };
export const GQLError = GraphQLError as any;
export { applyGraphQL } from "./applyGraphQL.ts";
export type { ApplyGraphQLOptions, ResolversProps } from "./applyGraphQL.ts";
